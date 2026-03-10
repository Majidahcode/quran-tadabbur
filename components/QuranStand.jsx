"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Heart } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   رسائل القلب الديناميكية — مرتبطة بموضوع كل وجه
   يتم اختيار الرسالة بحسب الكلمات المفتاحية في المواضيع
───────────────────────────────────────────────────────── */
const HEART_LIBRARY = [
  {
    keys: ["توحيد","الله","إيمان","عقيدة"],
    msg: "القرآن يُذكّرك كل يوم: ربك معك. ليس وحدك في هذه الحياة، لديك من لا يُعجزه شيء.",
  },
  {
    keys: ["رحمة","غفران","توبة","مغفرة"],
    msg: "مهما أثقلتك ذنوبك، القرآن يقول لك: بابُ ربك مفتوح. لم يُغلق يومًا على من يرجع.",
  },
  {
    keys: ["صبر","ابتلاء","شدة","ضيق","صعوبة"],
    msg: "كل ضيق مرّ عليك ذكره القرآن، والله يقول: إن مع العسر يسرًا. لا تستعجل الفرج.",
  },
  {
    keys: ["هداية","صراط","طريق","دليل"],
    msg: "القرآن هو الخريطة التي لن تضلّ معها. كلما عُدت إليه وجدت الطريق أوضح.",
  },
  {
    keys: ["دعاء","قرب","مناجاة","نداء"],
    msg: "ربك يسمعك. كل حرف تتلوه وكل دعوة تنطق بها — تصل إلى من لا تخفى عليه خافية.",
  },
  {
    keys: ["آخرة","جنة","حساب","يوم القيامة","جزاء"],
    msg: "ما تصنعه اليوم لن يضيع. القرآن يُذكّرك أن كل خير — ولو مثقال ذرة — له وزنه.",
  },
  {
    keys: ["أسرة","والدين","أبناء","أهل","علاقات"],
    msg: "القرآن دليلك في كل علاقة. بهداه تُصلح ما انكسر، وتُقوّي ما ضعف.",
  },
  {
    keys: ["رزق","عمل","دنيا","مال","قوت"],
    msg: "الله هو الرزّاق. القرآن يُطمئنك: لا يُنسى من توكّل على ربه، والرزق مكفول.",
  },
  {
    keys: ["خوف","قلق","وحدة","حزن","ألم"],
    msg: "القرآن نزل ليُشفي ما في الصدور. ما تشعر به الآن رآه ربك وجعل له في كتابه علاجًا.",
  },
  {
    keys: ["علم","حكمة","فقه","تدبر","فهم"],
    msg: "كل آية تتدبّرها تفتح لك بابًا. القرآن بحر لا ينضب — كلما غُصت وجدت جواهر جديدة.",
  },
  {
    keys: ["عبادة","صلاة","ذكر","تسبيح","قرآن"],
    msg: "قراءتك هذه ليست مجرد كلمات — إنها حوار مع الله. استمع جيدًا، فهو يُجيبك.",
  },
  {
    keys: ["نبي","رسول","قصص","سيرة"],
    msg: "قصص الأنبياء في القرآن ليست للتاريخ فقط — هي لك أنت اليوم. تأمّل كيف ثبتوا.",
  },
];

const DEFAULT_MSG = "هذا القرآن نزل من عند الله إليك أنت. في كل آية تقرؤها رسالة خُصّصت لك — لحياتك، لقلبك، لما تمرّ به الآن.";

function getHeartMessage(topics = []) {
  if (!topics.length) return DEFAULT_MSG;
  const joined = topics.join(" ");
  for (const entry of HEART_LIBRARY) {
    if (entry.keys.some(k => joined.includes(k))) return entry.msg;
  }
  return DEFAULT_MSG;
}

/* ─────────────────────────────────────────────────────────
   القرآن على الرحل — المكوّن الرئيسي
───────────────────────────────────────────────────────── */
export default function QuranStand({
  surahName,
  surahNum,
  wajhs,
  currentWajhIdx,
  onPrevWajh,
  onNextWajh,
  userName = "القارئ",
  userGender = "male",
}) {
  const [hovered, setHovered] = useState(false);
  const [msgVisible, setMsgVisible] = useState(true);

  const wajh = wajhs?.[currentWajhIdx];
  const totalWajhs = wajhs?.length || 0;
  const isFemale = userGender === "female";

  // Dynamic heart message — fades out then in on page change
  const heartMsg = getHeartMessage(wajh?.topics);

  useEffect(() => {
    setMsgVisible(false);
    const t = setTimeout(() => setMsgVisible(true), 320);
    return () => clearTimeout(t);
  }, [currentWajhIdx]);

  const greeting = isFemale
    ? `أختي ${userName && userName !== "القارئ" ? userName : "الغالية"}`
    : `أخي ${userName && userName !== "القارئ" ? userName : "الغالي"}`;

  return (
    <>
      <style>{`
        @keyframes beamPulse {
          0%,100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); }
          50%      { opacity: 1;   transform: translateX(-50%) scaleX(1.1); }
        }
        @keyframes sparkRise {
          0%   { transform: translate(0,0) scale(1);    opacity: 0.9; }
          100% { transform: translate(var(--dx),var(--dy)) scale(0.1); opacity: 0; }
        }
        @keyframes bookGlow {
          0%,100% { filter: drop-shadow(0 0 18px rgba(212,175,55,0.18)); }
          50%      { filter: drop-shadow(0 0 38px rgba(212,175,55,0.38)); }
        }
        @keyframes topGlow  { 0%,100%{opacity:.5} 50%{opacity:1}   }
        @keyframes botGlow  { 0%,100%{opacity:.3} 50%{opacity:.65} }
        @keyframes msgFade  {
          0%   { opacity:0; transform:translateY(6px); }
          100% { opacity:1; transform:translateY(0);   }
        }
        @keyframes heartBeat {
          0%,100%{ transform:scale(1);   }
          14%    { transform:scale(1.15); }
          28%    { transform:scale(1);   }
          42%    { transform:scale(1.1); }
          70%    { transform:scale(1);   }
        }
        .qs-nav-btn {
          background:none; border:none; cursor:pointer;
          color:#8a5a20; padding:3px; line-height:1; transition:color .2s;
        }
        .qs-nav-btn:hover   { color:#b8282a; }
        .qs-nav-btn:disabled{ opacity:.25; cursor:default; }
        .quran-scroll::-webkit-scrollbar{ width:3px; }
        .quran-scroll::-webkit-scrollbar-thumb{
          background:linear-gradient(to bottom,transparent,#b8862a,transparent);
          border-radius:10px;
        }
      `}</style>

      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", userSelect:"none", position:"relative" }}>

        {/* ══ DIVINE BEAM ══ */}
        <div style={{
          position:"absolute", top:"-108px", left:"50%", transform:"translateX(-50%)",
          width:"400px", height:"120px", zIndex:15, pointerEvents:"none",
        }}>
          <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
            width:"300px", height:"120px",
            background:"radial-gradient(ellipse 150px 120px at 50% 100%, rgba(255,220,100,.15) 0%, rgba(212,175,55,.05) 60%, transparent 80%)",
            animation:"beamPulse 4s ease-in-out infinite" }}/>
          <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
            width:"60px", height:"120px",
            background:"radial-gradient(ellipse 30px 120px at 50% 100%, rgba(255,228,110,.25) 0%, rgba(212,175,55,.07) 65%, transparent 100%)",
            animation:"beamPulse 4s ease-in-out infinite" }}/>
          <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
            width:"2px", height:"120px",
            background:"linear-gradient(to bottom,transparent,rgba(255,215,70,.4) 45%,rgba(255,232,100,.85) 100%)",
            filter:"blur(1px)", animation:"beamPulse 4s ease-in-out infinite" }}/>
          {[
            {l:"44%",b:"10px",dx:"-10px",dy:"-70px",d:"2.2s",dl:"0s"},
            {l:"50%",b:"3px", dx:"8px",  dy:"-80px",d:"2.7s",dl:".4s"},
            {l:"56%",b:"17px",dx:"12px", dy:"-60px",d:"2.4s",dl:".9s"},
            {l:"47%",b:"24px",dx:"-15px",dy:"-75px",d:"3s",  dl:"1.4s"},
            {l:"53%",b:"7px", dx:"10px", dy:"-55px",d:"2.6s",dl:"1.9s"},
          ].map((p,i)=>(
            <div key={i} style={{
              position:"absolute", bottom:p.b, left:p.l,
              width:"3px", height:"3px", borderRadius:"50%",
              background:"rgba(255,212,80,.9)", boxShadow:"0 0 5px rgba(255,198,50,.8)",
              "--dx":p.dx, "--dy":p.dy,
              animation:`sparkRise ${p.d} ease-out infinite`, animationDelay:p.dl,
            }}/>
          ))}
        </div>

        {/* ══ BOOK ══ */}
        <div
          onMouseEnter={()=>setHovered(true)}
          onMouseLeave={()=>setHovered(false)}
          style={{
            perspective:"1200px",
            transform: hovered ? "translateY(-8px)" : "translateY(0)",
            transition:"transform .6s cubic-bezier(.34,1.56,.64,1)",
            zIndex:10,
          }}
        >
          <div style={{
            width:"440px", height:"292px", position:"relative",
            animation:"bookGlow 5s ease-in-out infinite",
            transformStyle:"preserve-3d", transform:"rotateX(12deg)",
          }}>

            {/* ── SPINE ── */}
            <div style={{
              position:"absolute", left:"50%", top:0, bottom:0, width:"16px",
              transform:"translateX(-50%) translateZ(1px)",
              background:"linear-gradient(90deg,#4a2508 0%,#8b4a14 50%,#4a2508 100%)",
              zIndex:10, boxShadow:"0 0 10px rgba(0,0,0,.35)",
            }}>
              <div style={{ position:"absolute", top:8, bottom:8, left:"50%", width:"1.5px", transform:"translateX(-50%)",
                background:"linear-gradient(180deg,rgba(212,175,55,.25),rgba(212,175,55,.6) 50%,rgba(212,175,55,.25))" }}/>
              {[60,145,230].map(t=>(
                <div key={t} style={{ position:"absolute", top:t, left:"50%", width:"7px", height:"7px",
                  transform:"translateX(-50%) rotate(45deg)", background:"rgba(212,175,55,.5)", borderRadius:"1px" }}/>
              ))}
            </div>

            {/* ── LEFT PAGE — نص القرآن ── */}
            <div style={{
              position:"absolute", left:0, top:0, width:"50%", height:"100%",
              borderRadius:"5px 0 0 5px", overflow:"hidden",
              background:"linear-gradient(160deg,#fef9ed 0%,#faf2d8 55%,#f0e4b8 100%)",
              boxShadow:"inset -10px 0 24px rgba(0,0,0,.14), -5px 10px 20px rgba(0,0,0,.3)",
              direction:"rtl",
            }}>
              {/* Paper grain */}
              <div style={{ position:"absolute", inset:0, pointerEvents:"none",
                background:"repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(180,150,80,.04) 28px,rgba(180,150,80,.04) 29px)" }}/>
              {/* Top ambient line */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"2.5px",
                background:"linear-gradient(90deg,transparent,rgba(212,175,55,.75) 25%,rgba(255,235,120,1) 50%,rgba(212,175,55,.7) 75%,transparent)",
                animation:"topGlow 3s ease-in-out infinite", zIndex:5 }}/>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"50px",
                background:"linear-gradient(to bottom,rgba(212,175,55,.18) 0%,transparent 100%)",
                animation:"topGlow 3s ease-in-out infinite", zIndex:4 }}/>
              {/* Bottom ambient */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"2px",
                background:"linear-gradient(90deg,transparent,rgba(212,175,55,.5) 30%,rgba(255,220,100,.7) 50%,rgba(212,175,55,.45) 70%,transparent)",
                animation:"botGlow 3.5s ease-in-out infinite" }}/>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"36px",
                background:"linear-gradient(to top,rgba(212,175,55,.13) 0%,transparent 100%)",
                animation:"botGlow 3.5s ease-in-out infinite" }}/>
              {/* Red mushaf border */}
              <div style={{ position:"absolute", inset:"7px", border:"1.5px solid #b8282a", borderRadius:"2px", pointerEvents:"none" }}>
                <div style={{ position:"absolute", inset:"3px", border:"0.7px solid rgba(184,40,42,.35)", borderRadius:"1px" }}/>
              </div>
              {/* Curl shadows */}
              <div style={{ position:"absolute", top:0, left:0, width:"40px", height:"40px",
                background:"radial-gradient(ellipse at 0% 0%,rgba(160,120,60,.28) 0%,transparent 70%)", borderRadius:"0 0 30px 0" }}/>
              <div style={{ position:"absolute", bottom:0, left:0, width:"40px", height:"40px",
                background:"radial-gradient(ellipse at 0% 100%,rgba(160,120,60,.22) 0%,transparent 70%)", borderRadius:"0 30px 0 0" }}/>

              {/* Surah header */}
              <div style={{ textAlign:"center", padding:"12px 14px 5px" }}>
                <div style={{ width:"80%", margin:"0 auto 3px", height:"1px",
                  background:"linear-gradient(90deg,transparent,#b8282a,transparent)" }}/>
                <div style={{ color:"#b8282a", fontFamily:"Amiri,serif", fontSize:"10.5px", letterSpacing:".3px" }}>
                  {surahName ? `سورة ${surahName}` : "سورة الفاتحة"}
                </div>
                <div style={{ width:"80%", margin:"3px auto 0", height:"1px",
                  background:"linear-gradient(90deg,transparent,#b8282a,transparent)" }}/>
              </div>

              {/* Quran text — scrollable، أعلى بدون شريط المواضيع */}
              <div className="quran-scroll" style={{
                padding:"4px 14px 6px",
                overflowY:"auto", height:"212px",
                fontFamily:"Amiri Quran,Amiri,serif",
                fontSize:"13px", lineHeight:"2.12",
                color:"#130900", textAlign:"justify",
              }}>
                {wajh?.text || "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ﴿١﴾ ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ ﴿٢﴾ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ﴿٣﴾ مَٰلِكِ يَوۡمِ ٱلدِّينِ ﴿٤﴾ إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ ﴿٥﴾ ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ ﴿٦﴾"}
              </div>

              {/* ─ Navigation — دائماً ظاهرة في أسفل الصفحة ─ */}
              <div style={{
                position:"absolute", bottom:0, left:0, right:0,
                padding:"7px 14px 9px",
                background:"linear-gradient(to bottom, rgba(250,242,216,0) 0%, rgba(240,228,184,0.95) 30%)",
                borderTop:"1px solid rgba(184,40,42,.18)",
                display:"flex", justifyContent:"space-between", alignItems:"center",
                zIndex:6,
              }}>
                {/* زر الوجه التالي (يسار = تقدم في القراءة) */}
                <button
                  onClick={onNextWajh}
                  disabled={!totalWajhs || currentWajhIdx >= totalWajhs - 1}
                  style={{
                    display:"flex", alignItems:"center", gap:"3px",
                    background: (!totalWajhs || currentWajhIdx >= totalWajhs - 1)
                      ? "rgba(184,40,42,.05)"
                      : "rgba(184,40,42,.12)",
                    border:"1px solid rgba(184,40,42,.25)",
                    borderRadius:"20px", padding:"3px 10px 3px 7px",
                    cursor: (!totalWajhs || currentWajhIdx >= totalWajhs - 1) ? "default" : "pointer",
                    opacity: (!totalWajhs || currentWajhIdx >= totalWajhs - 1) ? 0.35 : 1,
                    transition:"all .2s",
                  }}
                >
                  <ChevronLeft size={12} color="#8a1a1a"/>
                  <span style={{ color:"#8a1a1a", fontSize:"9px", fontFamily:"Tajawal,sans-serif" }}>التالي</span>
                </button>

                {/* رقم الوجه الحالي */}
                <span style={{
                  color:"#7a3a10", fontSize:"10px", fontFamily:"Amiri,serif",
                  background:"rgba(184,40,42,.07)", borderRadius:"20px",
                  padding:"2px 10px", border:"0.5px solid rgba(184,40,42,.15)",
                }}>
                  {totalWajhs > 0 ? `${currentWajhIdx + 1} / ${totalWajhs}` : "—"}
                </span>

                {/* زر الوجه السابق */}
                <button
                  onClick={onPrevWajh}
                  disabled={currentWajhIdx <= 0}
                  style={{
                    display:"flex", alignItems:"center", gap:"3px",
                    background: currentWajhIdx <= 0
                      ? "rgba(184,40,42,.05)"
                      : "rgba(184,40,42,.12)",
                    border:"1px solid rgba(184,40,42,.25)",
                    borderRadius:"20px", padding:"3px 7px 3px 10px",
                    cursor: currentWajhIdx <= 0 ? "default" : "pointer",
                    opacity: currentWajhIdx <= 0 ? 0.35 : 1,
                    transition:"all .2s",
                  }}
                >
                  <span style={{ color:"#8a1a1a", fontSize:"9px", fontFamily:"Tajawal,sans-serif" }}>السابق</span>
                  <ChevronRight size={12} color="#8a1a1a"/>
                </button>
              </div>
            </div>

            {/* ── RIGHT PAGE — رسالة من القلب (ديناميكية) ── */}
            <div style={{
              position:"absolute", right:0, top:0, width:"50%", height:"100%",
              borderRadius:"0 5px 5px 0", overflow:"hidden",
              background:"linear-gradient(20deg,#ede0b5 0%,#f7eccc 40%,#fef9ed 100%)",
              boxShadow:"inset 10px 0 24px rgba(0,0,0,.09), 5px 10px 20px rgba(0,0,0,.28)",
              direction:"rtl",
            }}>
              {/* Paper grain */}
              <div style={{ position:"absolute", inset:0, pointerEvents:"none",
                background:"repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(180,150,80,.04) 28px,rgba(180,150,80,.04) 29px)" }}/>
              {/* Top ambient */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"2.5px",
                background:"linear-gradient(90deg,transparent,rgba(212,175,55,.7) 20%,rgba(255,235,120,1) 50%,rgba(212,175,55,.65) 80%,transparent)",
                animation:"topGlow 3s ease-in-out infinite", animationDelay:".3s", zIndex:5 }}/>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"50px",
                background:"linear-gradient(to bottom,rgba(212,175,55,.18) 0%,transparent 100%)",
                animation:"topGlow 3s ease-in-out infinite", animationDelay:".3s", zIndex:4 }}/>
              {/* Bottom ambient */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"2px",
                background:"linear-gradient(90deg,transparent,rgba(212,175,55,.45) 25%,rgba(255,220,100,.65) 50%,rgba(212,175,55,.4) 75%,transparent)",
                animation:"botGlow 3.5s ease-in-out infinite", animationDelay:".5s" }}/>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"36px",
                background:"linear-gradient(to top,rgba(212,175,55,.11) 0%,transparent 100%)",
                animation:"botGlow 3.5s ease-in-out infinite", animationDelay:".5s" }}/>
              {/* Red border */}
              <div style={{ position:"absolute", inset:"7px", border:"1.5px solid #b8282a", borderRadius:"2px", pointerEvents:"none" }}>
                <div style={{ position:"absolute", inset:"3px", border:"0.7px solid rgba(184,40,42,.35)", borderRadius:"1px" }}/>
              </div>
              {/* Curl shadows */}
              <div style={{ position:"absolute", top:0, right:0, width:"40px", height:"40px",
                background:"radial-gradient(ellipse at 100% 0%,rgba(160,120,60,.28) 0%,transparent 70%)", borderRadius:"0 0 0 30px" }}/>
              <div style={{ position:"absolute", bottom:0, right:0, width:"40px", height:"40px",
                background:"radial-gradient(ellipse at 100% 100%,rgba(160,120,60,.22) 0%,transparent 70%)", borderRadius:"30px 0 0 0" }}/>
              <div style={{ position:"absolute", top:0, left:0, width:"38px", height:"100%",
                background:"linear-gradient(to right,rgba(0,0,0,.09) 0%,transparent 100%)" }}/>

              {/* ─ DYNAMIC HEART MESSAGE ─ */}
              <div style={{
                display:"flex", flexDirection:"column", alignItems:"center",
                justifyContent:"center", height:"100%", padding:"18px 16px",
                textAlign:"center",
                opacity: msgVisible ? 1 : 0,
                transform: msgVisible ? "translateY(0)" : "translateY(8px)",
                transition:"opacity .4s ease, transform .4s ease",
              }}>

                {/* Heart icon — animated */}
                <div style={{ marginBottom:"10px", animation:"heartBeat 3s ease-in-out infinite" }}>
                  <Heart size={22} color="#b8282a" fill="rgba(184,40,42,.15)" strokeWidth={1.5}/>
                </div>

                {/* Title */}
                <div style={{ color:"#8a5a20", fontFamily:"Amiri,serif", fontSize:"12.5px",
                  fontWeight:700, marginBottom:"6px" }}>
                  رسالة من القلب
                </div>

                {/* Divider */}
                <div style={{ width:"50px", height:"1px",
                  background:"linear-gradient(90deg,transparent,#b8282a,transparent)",
                  marginBottom:"12px" }}/>

                {/* Greeting */}
                <div style={{ color:"#5a3510", fontFamily:"Tajawal,sans-serif",
                  fontSize:"11px", fontWeight:700, marginBottom:"8px" }}>
                  {greeting}،
                </div>

                {/* Message body — changes per wajh */}
                <p style={{ fontFamily:"Tajawal,sans-serif", fontSize:"10.5px",
                  color:"#4a3010", lineHeight:"1.75", margin:"0 0 12px",
                  textAlign:"justify" }}>
                  {heartMsg}
                </p>

                {/* Quran quote */}
                <div style={{
                  background:"rgba(184,40,42,.06)", border:"0.8px solid rgba(184,40,42,.18)",
                  borderRadius:"10px", padding:"8px 10px",
                  fontFamily:"Amiri Quran,Amiri,serif", fontSize:"11px",
                  color:"#3a1a0a", lineHeight:"1.8", textAlign:"center",
                }}>
                  ﴿ وَلَقَدۡ يَسَّرۡنَا ٱلۡقُرۡءَانَ لِلذِّكۡرِ ﴾
                </div>

                {/* Footer */}
                <div style={{ marginTop:"12px", fontFamily:"Amiri,serif",
                  fontSize:"9.5px", color:"#b8862a", fontStyle:"italic" }}>
                  تدبّر بعمق..
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ RAHL SVG ══ */}
        <div style={{ marginTop:"-5px", animation:"bookGlow 5s ease-in-out 2.5s infinite" }}>
          <svg width="460" height="170" viewBox="0 0 460 190" fill="none">
            <defs>
              <linearGradient id="wg1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#1e0d02"/>
                <stop offset="25%"  stopColor="#4a2008"/>
                <stop offset="55%"  stopColor="#6b3510"/>
                <stop offset="80%"  stopColor="#4a2008"/>
                <stop offset="100%" stopColor="#1e0d02"/>
              </linearGradient>
              <linearGradient id="wg2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#5a2a0a"/>
                <stop offset="50%"  stopColor="#3a1a06"/>
                <stop offset="100%" stopColor="#1e0d02"/>
              </linearGradient>
              <linearGradient id="wg3" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#5a2a0a"/>
                <stop offset="50%"  stopColor="#3a1a06"/>
                <stop offset="100%" stopColor="#1e0d02"/>
              </linearGradient>
              <linearGradient id="wgV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#7a3a10"/>
                <stop offset="50%"  stopColor="#4a2008"/>
                <stop offset="100%" stopColor="#1e0d02"/>
              </linearGradient>
              <linearGradient id="wgF" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#3a1a06"/>
                <stop offset="50%"  stopColor="#5a2a0a"/>
                <stop offset="100%" stopColor="#3a1a06"/>
              </linearGradient>
              <radialGradient id="pin" cx="50%" cy="38%" r="50%">
                <stop offset="0%"   stopColor="#f0c840"/>
                <stop offset="60%"  stopColor="#c89020"/>
                <stop offset="100%" stopColor="#8a5a10"/>
              </radialGradient>
              <filter id="ws"><feDropShadow dx="1" dy="2" stdDeviation="2.5" floodOpacity=".55"/></filter>
              <filter id="wl"><feDropShadow dx="0" dy="2" stdDeviation="3"   floodOpacity=".6"/></filter>
            </defs>

            {/* Left cradle arm */}
            <path d="M228,4 C210,6 168,12 118,26 C75,38 45,55 28,78 C16,95 16,116 22,134 C26,124 34,112 46,103 C60,92 85,76 120,60 C155,44 190,28 225,16 Z"
              fill="#1a0a02" opacity=".9" filter="url(#ws)"/>
            <path d="M228,0 C210,3 165,10 112,24 C70,36 40,54 24,76 C12,93 13,114 20,130 C24,120 32,108 44,99 C59,88 84,72 118,56 C153,40 190,24 225,12 Z"
              fill="url(#wg1)" filter="url(#ws)"/>
            <path d="M228,0 C210,3 165,10 112,24 C70,36 40,54 24,76"
              stroke="rgba(180,100,40,.35)" strokeWidth="1.5" fill="none"/>
            <path d="M22,130 C34,118 58,102 90,84 C122,66 165,46 225,16 L228,22 C168,50 125,70 92,90 C60,108 36,124 25,136 Z"
              fill="rgba(255,160,60,.08)"/>

            {/* Right cradle arm */}
            <path d="M232,4 C250,6 292,12 342,26 C385,38 415,55 432,78 C444,95 444,116 438,134 C434,124 426,112 414,103 C400,92 375,76 340,60 C305,44 270,28 235,16 Z"
              fill="#1a0a02" opacity=".9" filter="url(#ws)"/>
            <path d="M232,0 C250,3 295,10 348,24 C390,36 420,54 436,76 C448,93 447,114 440,130 C436,120 428,108 416,99 C401,88 376,72 342,56 C307,40 270,24 235,12 Z"
              fill="url(#wg1)" filter="url(#ws)"/>
            <path d="M232,0 C250,3 295,10 348,24 C390,36 420,54 436,76"
              stroke="rgba(180,100,40,.35)" strokeWidth="1.5" fill="none"/>
            <path d="M438,130 C426,118 402,102 370,84 C338,66 295,46 235,16 L232,22 C292,50 335,70 368,90 C400,108 424,124 435,136 Z"
              fill="rgba(255,160,60,.08)"/>

            {/* Spine connector */}
            <path d="M222,8 L238,8 L242,148 L218,148 Z" fill="url(#wgV)" filter="url(#ws)"/>
            <line x1="230" y1="14" x2="230" y2="143" stroke="rgba(212,175,55,.28)" strokeWidth="1.2"/>
            <ellipse cx="230" cy="78" rx="7" ry="9" fill="none" stroke="rgba(212,175,55,.42)" strokeWidth="1.2"/>
            <ellipse cx="230" cy="78" rx="3" ry="4" fill="rgba(212,175,55,.18)"/>

            {/* Left leg */}
            <path d="M200,140 L178,136 L28,178 L48,185 L212,150 Z" fill="url(#wg2)" filter="url(#wl)"/>
            <ellipse cx="118" cy="159" rx="14" ry="5" fill="#100600" opacity=".6" transform="rotate(-18,118,159)"/>
            <path d="M16,175 Q33,170 56,174 Q50,182 30,185 Q10,183 12,175 Z" fill="url(#wgF)" filter="url(#wl)"/>

            {/* Right leg */}
            <path d="M260,140 L282,136 L432,178 L412,185 L248,150 Z" fill="url(#wg3)" filter="url(#wl)"/>
            <ellipse cx="342" cy="159" rx="14" ry="5" fill="#100600" opacity=".6" transform="rotate(18,342,159)"/>
            <path d="M444,175 Q427,170 404,174 Q410,182 430,185 Q450,183 448,175 Z" fill="url(#wgF)" filter="url(#wl)"/>

            {/* Gold pivot */}
            <circle cx="230" cy="158" r="9"  fill="url(#pin)"/>
            <circle cx="230" cy="158" r="6"  fill="rgba(212,175,55,.7)"/>
            <circle cx="230" cy="158" r="3"  fill="rgba(255,220,100,.9)"/>

            {/* Wood grain lines */}
            <path d="M115,28 C108,35 103,46 102,58" stroke="rgba(100,45,10,.25)" strokeWidth=".8" fill="none"/>
            <path d="M130,24 C122,32 117,44 116,56" stroke="rgba(100,45,10,.18)" strokeWidth=".8" fill="none"/>
            <path d="M345,28 C352,35 357,46 358,58" stroke="rgba(100,45,10,.25)" strokeWidth=".8" fill="none"/>
            <path d="M330,24 C338,32 343,44 344,56" stroke="rgba(100,45,10,.18)" strokeWidth=".8" fill="none"/>

            {/* Floor shadow */}
            <ellipse cx="230" cy="187" rx="142" ry="6" fill="rgba(0,0,0,.32)" filter="url(#wl)"/>
          </svg>
        </div>

        <div style={{ color:"rgba(212,175,55,.45)", fontSize:"11px",
          fontFamily:"Tajawal,sans-serif", textAlign:"center", marginTop:"2px" }}>
          ✦ كِتابُ القرآن ✦
        </div>
      </div>
    </>
  );
}
