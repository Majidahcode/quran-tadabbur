import { NextResponse } from "next/server";

/* ══════════════════════════════════════════════════════
   Rate limiting — in-memory (كافي لـ Vercel serverless)
   كل IP: أقصى 20 طلب كل 60 ثانية
══════════════════════════════════════════════════════ */
const RATE_MAP = new Map();
const RATE_LIMIT   = 20;
const RATE_WINDOW  = 60_000; // 60s

function checkRateLimit(ip) {
  const now  = Date.now();
  const data = RATE_MAP.get(ip) || { count: 0, start: now };
  if (now - data.start > RATE_WINDOW) {
    RATE_MAP.set(ip, { count: 1, start: now });
    return true;
  }
  if (data.count >= RATE_LIMIT) return false;
  RATE_MAP.set(ip, { count: data.count + 1, start: data.start });
  return true;
}

/* ══════════════════════════════════════════════════════
   Input sanitizer — يمنع prompt injection
══════════════════════════════════════════════════════ */
function sanitize(value, maxLen = 200) {
  if (typeof value !== "string") return "";
  return value
    .trim()
    .slice(0, maxLen)
    .replace(/[<>{}`]/g, "");          // منع HTML/JS injection
}

function sanitizeNum(value) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) ? Math.max(1, Math.min(n, 114)) : 1;
}

/* ══════════════════════════════════════════════════════
   الـ Route الرئيسي
══════════════════════════════════════════════════════ */
export async function POST(req) {
  /* ── Security headers ── */
  const headers = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
  };

  /* ── Rate limit check ── */
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
           ?? req.headers.get("x-real-ip")
           ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "too_many_requests" },
      { status: 429, headers }
    );
  }

  /* ── Parse & validate body ── */
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid_json" },
      { status: 400, headers }
    );
  }

  const surahName  = sanitize(body.surahName,  60);
  const surahNum   = sanitizeNum(body.surahNum);
  const verseText  = sanitize(body.verseText,  4000);
  const verseFrom  = sanitizeNum(body.verseFrom);
  const verseTo    = sanitizeNum(body.verseTo);
  const userName   = sanitize(body.userName,   40);
  const userGender = body.userGender === "female" ? "female" : "male";

  /* ── Guard: مفتاح API موجود؟ ── */
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY not set");
    return NextResponse.json(
      { success: false, error: "server_config_error" },
      { status: 500, headers }
    );
  }

  const isFemale = userGender === "female";
  const hasName  = userName.length > 0;

  const genderRules = isFemale
    ? "المستخدم أنثى — استخدمي ضمائر المؤنث: (أنتِ، لكِ، معكِ، قلبكِ)"
    : "المستخدم ذكر — استخدم ضمائر المذكر: (أنتَ، لكَ، معكَ، قلبكَ)";

  const addressNote = hasName
    ? `خاطب المستخدم باسمه "${userName}" في رسالة القلب مباشرة.`
    : `استخدم (يا أخي/يا أختي) بحسب الجنس`;

  const prompt = `أنت مرشد قرآني روحي. أسلوبك حنون يلامس القلب ويربط القرآن بالحياة اليومية.

السورة: ${surahName} (رقم ${surahNum})
الآيات: ${verseFrom} إلى ${verseTo}
نص الآيات:
${verseText}

${genderRules}
${addressNote}

أجب بـ JSON فقط بدون أي نص خارجه:
{
  "title": "عنوان معبّر للوجه (3-5 كلمات)",
  "topics": ["موضوع 1", "موضوع 2", "موضوع 3"],
  "thematicFlow": ["فكرة 1", "فكرة 2", "فكرة 3"],
  "insights": [
    {"label": "اسم قصير", "desc": "شرح عاطفي بضمير جنس المستخدم"},
    {"label": "اسم قصير", "desc": "شرح عاطفي آخر"}
  ],
  "practical": "تطبيق عملي واحد يستطيع المستخدم فعله اليوم",
  "heartMessage": "رسالة شخصية ${hasName ? `لـ${userName}` : "للمستخدم"} من 3-4 أسطر بضمير جنسه"
}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type":      "application/json",
        "x-api-key":         process.env.ANTHROPIC_API_KEY,  // server-side فقط
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model:      "claude-sonnet-4-20250514",
        max_tokens: 1200,
        messages:   [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Anthropic API error:", response.status, errBody);
      throw new Error(`API_${response.status}`);
    }

    const data   = await response.json();
    const raw    = data.content?.[0]?.text || "{}";
    const clean  = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    /* نتحقق أن الـ response فيه الحقول المطلوبة */
    if (!parsed.title || !parsed.topics) throw new Error("INVALID_RESPONSE");

    return NextResponse.json({ success: true, data: parsed }, { headers });

  } catch (err) {
    console.error("Tadabbur route error:", err.message);

    /* Fallback آمن — لا يكشف تفاصيل الخطأ للعميل */
    const fallbackMsg = hasName
      ? (isFemale
          ? `${userName}، هذه الآيات ليست صدفة. الله يعلم ما في قلبكِ، ويعلم ما تحتاجينه الآن.`
          : `${userName}، هذه الآيات ليست صدفة. الله يعلم ما في قلبكَ، ويعلم ما تحتاجه الآن.`)
      : (isFemale
          ? "أختي، هذه الآيات نزلت من عند الله وهي تحمل رسالة لكِ أنتِ في هذه اللحظة."
          : "أخي، هذه الآيات نزلت من عند الله وهي تحمل رسالة لكَ أنتَ في هذه اللحظة.");

    return NextResponse.json({
      success: false,
      data: {
        title:  "تدبر الوجه",
        topics: ["التأمل في كلام الله", "الاتصال بالله", "التدبر والعمل"],
        thematicFlow: [
          "هذه الآيات تحمل رسالة مباشرة لحياتك",
          "كل كلمة فيها تعالج شيئاً تعيشه الآن",
          "التدبر الحقيقي هو أن تجد نفسك في القرآن",
        ],
        insights: [
          { label: "الحضور مع الله", desc: "حين يحضر قلبك مع الآيات، تشعر أن الله يتحدث إليك مباشرة." },
          { label: "القرآن دواء",    desc: "ما تمر به من ضيق أو فرح أو حيرة — ستجد له في هذه الآيات علاجاً." },
        ],
        practical: isFemale
          ? "اقرئي هذه الآيات مرة ثانية ببطء، وبعد كل آية اسألي نفسكِ: ماذا يقول الله لي اليوم؟"
          : "اقرأ هذه الآيات مرة ثانية ببطء، وبعد كل آية اسأل نفسكَ: ماذا يقول الله لي اليوم؟",
        heartMessage: fallbackMsg,
      }
    }, { headers });
  }
}
