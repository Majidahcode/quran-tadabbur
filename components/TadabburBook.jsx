"use client";
import { useEffect, useState } from "react";
import { Sparkles, Target, Loader, Heart } from "lucide-react";

export default function TadabburBook({
  tadabburData, isAnimating, isLoading,
  userName, userGender, surahName,
}) {
  const [visible,  setVisible]  = useState(false);
  const [entered,  setEntered]  = useState(false);
  const [msgAnim,  setMsgAnim]  = useState(true);

  useEffect(() => {
    if (tadabburData || isLoading) {
      setVisible(true);
      setTimeout(() => setEntered(true), 50);
    }
  }, [tadabburData, isLoading]);

  useEffect(() => {
    if (isAnimating) {
      setEntered(false);
      setMsgAnim(false);
      setTimeout(() => { setEntered(true); setMsgAnim(true); }, 80);
    }
  }, [isAnimating]);

  const isFemale = userGender === "female";
  const hasName  = userName && userName !== "القارئ" && userName.trim() !== "";
  const d = tadabburData;

  // Gendered address pronouns
  const pronoun = isFemale ? "ي" : "";   // suffix for يا أختي / يا أخي
  const greeting = hasName
    ? (isFemale ? `يا ${userName}` : `يا ${userName}`)
    : (isFemale ? "يا أختاه" : "يا أخي");

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position:-200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes msgFade {
          0%   { opacity:0; transform:translateY(8px) scale(.97); }
          100% { opacity:1; transform:translateY(0)  scale(1);    }
        }
        @keyframes heartPulse {
          0%,100%{ transform:scale(1);    }
          35%    { transform:scale(1.18); }
          55%    { transform:scale(1);    }
          75%    { transform:scale(1.1);  }
        }
        .tdb-scroll::-webkit-scrollbar { width:2px; }
        .tdb-scroll::-webkit-scrollbar-thumb {
          background:rgba(45,138,94,.4); border-radius:10px;
        }
      `}</style>

      <div style={{
        opacity:   visible ? 1 : 0,
        transform: entered
          ? "translateX(0) translateY(0) scale(1) rotate(0deg)"
          : "translateX(-100px) translateY(20px) scale(0.7) rotate(-6deg)",
        transition: entered
          ? "opacity .7s ease, transform .75s cubic-bezier(.2,.8,.3,1)"
          : "none",
        transformOrigin:"left center",
        position:"relative",
      }}>

        {/* ── Book shell ── */}
        <div style={{
          width:"340px",
          background: isLoading
            ? "linear-gradient(135deg,#0a1f0f,#0d2814)"
            : "linear-gradient(135deg,#0e2010,#122816)",
          borderRadius:"4px 12px 12px 4px",
          boxShadow:"0 0 40px rgba(45,138,94,.2), 0 0 80px rgba(45,138,94,.08), 0 20px 50px rgba(0,0,0,.7)",
          border:"1px solid rgba(45,138,94,.3)",
          position:"relative",
          minHeight:"290px",
          display:"flex",
          overflow:"hidden",
        }}>

          {/* Spine */}
          <div style={{
            width:"14px", flexShrink:0,
            background:"linear-gradient(90deg,#1a0900,#3d1a02,#1a0900)",
          }}>
            <div style={{ position:"absolute", top:0, left:0, width:"14px", height:"100%",
              background:"linear-gradient(180deg,rgba(212,175,55,.2) 0%,rgba(212,175,55,.05) 30%,rgba(212,175,55,.05) 70%,rgba(212,175,55,.2) 100%)" }}/>
          </div>

          {/* ── LEFT PAGE: Topics + Insights ── */}
          <div style={{
            flex:1, padding:"14px 10px 14px 12px",
            borderRight:"1px solid rgba(45,138,94,.15)",
            overflow:"hidden", display:"flex", flexDirection:"column",
          }}>
            {isLoading ? (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center",
                justifyContent:"center", flex:1, gap:"10px" }}>
                <Loader size={22} color="#4aaa6a" style={{ animation:"spin 1s linear infinite" }}/>
                <span style={{ color:"rgba(180,220,190,.6)", fontFamily:"Tajawal,sans-serif", fontSize:"11px" }}>
                  {hasName
                    ? (isFemale ? `جاري تهيئة تدبرك يا ${userName}...` : `جاري تهيئة تدبرك يا ${userName}...`)
                    : "جاري توليد التدبر..."}
                </span>
                {[80,65,90,70,55].map((w,i)=>(
                  <div key={i} style={{
                    width:`${w}%`, height:"7px",
                    background:"linear-gradient(90deg,rgba(45,138,94,.1) 25%,rgba(45,138,94,.25) 50%,rgba(45,138,94,.1) 75%)",
                    backgroundSize:"200% 100%",
                    animation:`shimmer 1.5s ${i*.2}s infinite`,
                    borderRadius:"4px",
                  }}/>
                ))}
              </div>
            ) : (
              <div dir="rtl" style={{ display:"flex", flexDirection:"column", flex:1 }}>

                {/* Title */}
                <div style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"9px" }}>
                  <Sparkles size={12} color="#4aaa6a"/>
                  <span style={{ color:"#4aaa6a", fontSize:"10.5px", fontWeight:700,
                    fontFamily:"Tajawal,sans-serif" }}>
                    {d?.title || "تدبر الوجه"}
                  </span>
                </div>

                {/* Topics */}
                <div style={{ marginBottom:"8px" }}>
                  {(d?.topics || []).slice(0,3).map((t,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"5px" }}>
                      <div style={{ width:"4px", height:"4px", borderRadius:"50%",
                        background:"#2d8a5e", flexShrink:0 }}/>
                      <span style={{ color:"rgba(190,220,200,.85)", fontSize:"9.5px",
                        fontFamily:"Tajawal,sans-serif", lineHeight:1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>

                {/* Insights */}
                <div className="tdb-scroll" style={{ flex:1, overflowY:"auto" }}>
                  {(d?.insights || []).slice(0,2).map((ins,i)=>(
                    <div key={i} style={{
                      background:"rgba(45,138,94,.08)", border:"1px solid rgba(45,138,94,.15)",
                      borderRadius:"8px", padding:"7px", marginBottom:"5px",
                    }}>
                      <div style={{ color:"#4aaa6a", fontSize:"9px", fontWeight:700,
                        fontFamily:"Tajawal,sans-serif", marginBottom:"3px" }}>
                        ✦ {ins.label}
                      </div>
                      <p style={{
                        color:"rgba(180,210,190,.75)", fontSize:"9px", lineHeight:"1.6", margin:0,
                        fontFamily:"Tajawal,sans-serif",
                        display:"-webkit-box", WebkitLineClamp:3,
                        WebkitBoxOrient:"vertical", overflow:"hidden",
                      }}>{ins.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Practical */}
                {d?.practical && (
                  <div style={{ marginTop:"6px", paddingTop:"6px",
                    borderTop:"1px solid rgba(45,138,94,.1)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px", marginBottom:"4px" }}>
                      <Target size={10} color="#d4af37"/>
                      <span style={{ color:"#d4af37", fontSize:"9px", fontWeight:700,
                        fontFamily:"Tajawal,sans-serif" }}>تطبيق عملي</span>
                    </div>
                    <p style={{
                      color:"rgba(220,210,170,.8)", fontSize:"9px", lineHeight:"1.6", margin:0,
                      fontFamily:"Tajawal,sans-serif",
                      display:"-webkit-box", WebkitLineClamp:3,
                      WebkitBoxOrient:"vertical", overflow:"hidden",
                    }}>{d.practical}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── RIGHT PAGE: رسالة شخصية من القرآن ── */}
          <div style={{
            flex:1, padding:"14px 14px 14px 10px",
            display:"flex", flexDirection:"column",
            background:"linear-gradient(180deg,rgba(45,138,94,.04) 0%,transparent 100%)",
          }}>
            {isLoading ? (
              <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ textAlign:"center", direction:"rtl" }}>
                  <div style={{ fontSize:"20px", marginBottom:"8px", animation:"heartPulse 2s ease-in-out infinite" }}>💚</div>
                  <span style={{ color:"rgba(180,220,190,.4)", fontFamily:"Tajawal,sans-serif", fontSize:"10px" }}>
                    {hasName
                      ? (isFemale ? `تُعدّ رسالتك يا ${userName}` : `تُعدّ رسالتك يا ${userName}`)
                      : "تُعدّ رسالتك"}
                  </span>
                </div>
              </div>
            ) : (
              <div dir="rtl" style={{
                flex:1, display:"flex", flexDirection:"column",
                animation: msgAnim ? "msgFade .6s .15s ease both" : "none",
              }}>

                {/* ── Personal header ── */}
                <div style={{ textAlign:"center", marginBottom:"10px" }}>
                  <div style={{ animation:"heartPulse 3s ease-in-out infinite", display:"inline-block",
                    marginBottom:"5px" }}>
                    <Heart size={16} color="#d4af37" fill="rgba(212,175,55,.12)" strokeWidth={1.5}/>
                  </div>
                  <div style={{ color:"#d4af37", fontSize:"10px", fontWeight:700,
                    fontFamily:"Tajawal,sans-serif", marginBottom:"4px" }}>
                    رسالة القرآن إليك
                  </div>
                  <div style={{ width:"50%", height:"1px", margin:"0 auto",
                    background:"linear-gradient(90deg,transparent,#d4af37,transparent)" }}/>
                </div>

                {/* ── Name badge ── */}
                {hasName && (
                  <div style={{
                    textAlign:"center", marginBottom:"8px",
                  }}>
                    <span style={{
                      display:"inline-block",
                      background:"linear-gradient(135deg,rgba(212,175,55,.12),rgba(45,138,94,.08))",
                      border:"1px solid rgba(212,175,55,.25)",
                      borderRadius:"20px", padding:"3px 14px",
                      color:"#e8c84a", fontSize:"11px",
                      fontFamily:"Tajawal,sans-serif", fontWeight:700,
                    }}>
                      {isFemale ? `✿ ${userName}` : `✦ ${userName}`}
                    </span>
                  </div>
                )}

                {/* ── Heart message from Claude ── */}
                <div style={{
                  flex:1,
                  background:"linear-gradient(135deg,rgba(212,175,55,.06),rgba(45,138,94,.04))",
                  border:"1px solid rgba(212,175,55,.14)",
                  borderRadius:"10px", padding:"10px",
                  overflow:"hidden",
                }}>
                  <p style={{
                    color:"rgba(240,228,185,.9)",
                    fontSize:"10px", lineHeight:"1.85", margin:0,
                    fontFamily:"Tajawal,sans-serif", direction:"rtl",
                    display:"-webkit-box", WebkitLineClamp:8,
                    WebkitBoxOrient:"vertical", overflow:"hidden",
                  }}>
                    {d?.heartMessage
                      ? d.heartMessage
                      : (hasName
                          ? (isFemale
                              ? `${userName}، هذا الكلام نزل من عند الله ووصل إليكِ أنتِ. في هذه الآيات رسالة خُصّصت لقلبكِ اليوم.`
                              : `${userName}، هذا الكلام نزل من عند الله ووصل إليكَ أنتَ. في هذه الآيات رسالة خُصّصت لقلبكَ اليوم.`)
                          : "هذا الكلام نزل من عند الله ووصل إليك أنت. في هذه الآيات رسالة خُصّصت لقلبك اليوم."
                      )}
                  </p>
                </div>

                {/* ── Gendered closing ── */}
                <div style={{ marginTop:"8px", textAlign:"center" }}>
                  <div style={{ width:"40%", height:"1px", margin:"0 auto 5px",
                    background:"linear-gradient(90deg,transparent,rgba(212,175,55,.3),transparent)" }}/>
                  <span style={{ color:"rgba(212,175,55,.45)", fontSize:"8.5px",
                    fontFamily:"Amiri,serif", fontStyle:"italic" }}>
                    {isFemale
                      ? `تدبّري بعمق${hasName ? ` يا ${userName}` : ""}`
                      : `تدبّر بعمق${hasName ? ` يا ${userName}` : ""}`}
                  </span>
                </div>

                {/* ── Surah label ── */}
                <div style={{ marginTop:"6px", paddingTop:"6px",
                  borderTop:"1px solid rgba(212,175,55,.08)", textAlign:"center" }}>
                  <span style={{ color:"rgba(212,175,55,.38)", fontSize:"8px", fontFamily:"Amiri,serif" }}>
                    سورة {surahName}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Inner glow */}
          <div style={{ position:"absolute", inset:0, pointerEvents:"none",
            background:"radial-gradient(ellipse at 50% 0%,rgba(45,138,94,.06) 0%,transparent 60%)" }}/>
        </div>

        {/* Depth covers */}
        <div style={{ position:"absolute", top:4, left:-6, width:"100%", height:"100%",
          background:"#0a1506", borderRadius:"4px 12px 12px 4px", zIndex:-1,
          border:"1px solid rgba(45,138,94,.12)" }}/>
        <div style={{ position:"absolute", top:8, left:-12, width:"100%", height:"100%",
          background:"#070f04", borderRadius:"4px 12px 12px 4px", zIndex:-2,
          border:"1px solid rgba(45,138,94,.07)" }}/>

        <div style={{ textAlign:"center", marginTop:"10px",
          color:"#4aaa6a", fontSize:"11px", fontFamily:"Tajawal,sans-serif", opacity:.65 }}>
          ✦ كتاب التدبر
        </div>
      </div>
    </>
  );
}
