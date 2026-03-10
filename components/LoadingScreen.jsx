"use client";
import { useEffect, useState } from "react";

const ORBIT_VERSES = [
  "كِتَٰبٌ أَنزَلۡنَٰهُ إِلَيۡكَ مُبَٰرَكٌ لِّيَدَّبَّرُوٓاْ ءَايَٰتِهِۦ",
  "لَقَدۡ أَنزَلۡنَآ إِلَيۡكُمۡ كِتَٰبٗا فِيهِ ذِكۡرُكُمۡۚ أَفَلَا تَعۡقِلُونَ",
  "إِنَّ هَٰذَا ٱلۡقُرۡءَانَ يَهۡدِي لِلَّتِي هِيَ أَقۡوَمُ",
  "وَنُنَزِّلُ مِنَ ٱلۡقُرۡءَانِ مَا هُوَ شِفَآءٌ وَرَحۡمَةٌ لِّلۡمُؤۡمِنِينَ",
  "أَفَلَا يَتَدَبَّرُونَ ٱلۡقُرۡءَانَۚ وَلَوۡ كَانَ مِنۡ عِندِ غَيۡرِ ٱللَّهِ",
  "وَلَقَدۡ يَسَّرۡنَا ٱلۡقُرۡءَانَ لِلذِّكۡرِ فَهَلۡ مِن مُّدَّكِرٍ",
];

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => onDone?.(), 600);
          }, 300);
          return 100;
        }
        return p + 1.4;
      });
    }, 45);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <>
      <style>{`
        @keyframes descendBook {
          0% { transform: translateY(-120px) scale(0.7); opacity: 0; }
          60% { transform: translateY(10px) scale(1.05); opacity: 1; }
          80% { transform: translateY(-5px) scale(0.98); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes orbit0 {
          0% { transform: rotate(0deg) translateX(220px) rotate(0deg); opacity: 0.7; }
          50% { opacity: 1; }
          100% { transform: rotate(360deg) translateX(220px) rotate(-360deg); opacity: 0.7; }
        }
        @keyframes orbit1 {
          0% { transform: rotate(60deg) translateX(270px) rotate(-60deg); opacity: 0.6; }
          50% { opacity: 0.9; }
          100% { transform: rotate(420deg) translateX(270px) rotate(-420deg); opacity: 0.6; }
        }
        @keyframes orbit2 {
          0% { transform: rotate(120deg) translateX(190px) rotate(-120deg); opacity: 0.8; }
          50% { opacity: 1; }
          100% { transform: rotate(480deg) translateX(190px) rotate(-480deg); opacity: 0.8; }
        }
        @keyframes orbit3 {
          0% { transform: rotate(180deg) translateX(250px) rotate(-180deg); opacity: 0.65; }
          100% { transform: rotate(540deg) translateX(250px) rotate(-540deg); opacity: 0.65; }
        }
        @keyframes orbit4 {
          0% { transform: rotate(240deg) translateX(210px) rotate(-240deg); opacity: 0.75; }
          100% { transform: rotate(600deg) translateX(210px) rotate(-600deg); opacity: 0.75; }
        }
        @keyframes orbit5 {
          0% { transform: rotate(300deg) translateX(260px) rotate(-300deg); opacity: 0.7; }
          100% { transform: rotate(660deg) translateX(260px) rotate(-660deg); opacity: 0.7; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: scaleX(1); }
          50% { opacity: 0.7; transform: scaleX(1.2); }
        }
        @keyframes particleFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-60px) scale(0.3); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .orbit-text {
          position: absolute;
          top: 50%;
          left: 50%;
          font-family: 'Amiri Quran', 'Amiri', serif;
          font-size: 11px;
          color: #d4af37;
          white-space: nowrap;
          transform-origin: 0 0;
          text-shadow: 0 0 12px rgba(212,175,55,0.8), 0 0 24px rgba(212,175,55,0.4);
        }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "radial-gradient(ellipse at 50% 40%, #0a1f0f 0%, #040c06 50%, #020704 100%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        transition: "opacity 0.6s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}>

        {/* Orbit container */}
        <div style={{ position: "relative", width: "560px", height: "560px", display: "flex", alignItems: "center", justifyContent: "center" }}>

          {/* Orbit rings */}
          {[190, 230, 265].map((r, i) => (
            <div key={i} style={{
              position: "absolute",
              width: r * 2, height: r * 2,
              borderRadius: "50%",
              border: `1px solid rgba(212,175,55,${0.06 - i * 0.01})`,
              boxShadow: `0 0 ${20 + i * 10}px rgba(212,175,55,${0.04 - i * 0.01})`,
            }} />
          ))}

          {/* Orbiting verses */}
          {ORBIT_VERSES.map((verse, i) => (
            <div key={i} className="orbit-text" style={{
              animation: `orbit${i} ${12 + i * 2}s linear infinite`,
              animationDelay: `${i * -3}s`,
              marginTop: "-6px",
              marginLeft: "-4px",
            }}>
              {verse}
            </div>
          ))}

          {/* Center: Quran Book */}
          <div style={{
            animation: "descendBook 1.2s cubic-bezier(0.2,0.8,0.3,1) forwards",
            position: "relative",
          }}>
            {/* Light beam above book */}
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
            <div style={{
              position: "absolute", top: "-120px", left: "50%",
              transform: "translateX(-50%)",
              width: "60px", height: "120px",
              background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.08))",
            }} />

            {/* Book */}
            <div style={{
              width: "160px", height: "200px",
              background: "linear-gradient(160deg, #1a0f00, #2d1a00, #1a0f00)",
              borderRadius: "4px 12px 12px 4px",
              border: "1px solid rgba(212,175,55,0.4)",
              boxShadow: "0 0 60px rgba(212,175,55,0.35), 0 0 120px rgba(212,175,55,0.15), inset 0 0 30px rgba(212,175,55,0.05), 0 20px 50px rgba(0,0,0,0.8)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "10px", position: "relative", overflow: "hidden",
            }}>
              {/* Cover decorations */}
              <div style={{
                position: "absolute", inset: "8px",
                border: "1px solid rgba(212,175,55,0.25)",
                borderRadius: "2px 8px 8px 2px",
              }} />
              <div style={{
                position: "absolute", inset: "14px",
                border: "1px solid rgba(212,175,55,0.12)",
                borderRadius: "1px 6px 6px 1px",
              }} />

              {/* Inner glow */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.15) 0%, transparent 70%)",
              }} />

              {/* Center medallion */}
              <div style={{
                width: "70px", height: "70px",
                borderRadius: "50%",
                border: "1.5px solid rgba(212,175,55,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(212,175,55,0.08)",
                boxShadow: "0 0 20px rgba(212,175,55,0.3)",
                position: "relative", zIndex: 1,
              }}>
              <div style={{ 
  position: "relative", 
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center" 
}}>
  {/* 1. الخط المذهب العلوي (Golden Thread) */}
  <div style={{ 
    width: "1px", 
    height: "60px", 
    background: "linear-gradient(180deg, transparent, rgba(212, 175, 55, 0.8))" 
  }} />

  {/* 2. أيقونة الهلال والنجمة (SVG White) لضمان اللون الأبيض الصريح */}
  <div style={{ marginTop: "-70px" }}>
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.1373 21.8906 10.3001 21.6853 9.5C20.409 10.9931 18.5178 12 16.4 12C12.313 12 9 8.687 9 4.6C9 3.61114 9.19442 2.66771 9.54563 1.80532C10.3121 1.93291 11.1276 2 12 2ZM18 2L18.435 2.88197L19.4142 3L18.7071 3.70711L18.8727 4.68614L18 4.22361L17.1273 4.68614L17.2929 3.70711L16.5858 3L17.565 2.88197L18 2Z" 
        fill="white" 
      />
    </svg>
  </div>
</div>
              </div>

              <div style={{
                color: "#d4af37", fontFamily: "Amiri, serif",
                fontSize: "14px", fontWeight: 700,
                textAlign: "center", position: "relative", zIndex: 1,
                textShadow: "0 0 10px rgba(212,175,55,0.5)",
              }}>
                القرآن الكريم
              </div>
              <div style={{
                color: "rgba(212,175,55,0.6)", fontFamily: "Amiri, serif",
                fontSize: "10px", position: "relative", zIndex: 1,
              }}>
                كتاب التدبر  
              </div>

              {/* Floating particles */}
              {[15, 35, 55, 75, 95].map((left, i) => (
                <div key={i} style={{
                  position: "absolute",
                  bottom: `${10 + (i % 3) * 20}px`,
                  left: `${left}%`,
                  width: "2px", height: "2px",
                  borderRadius: "50%",
                  background: "#d4af37",
                  animation: `particleFloat ${1.5 + i * 0.4}s ease-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Title & progress */}
        <div style={{ textAlign: "center", animation: "fadeInUp 0.8s 0.5s forwards", opacity: 0, marginTop: "-20px" }}>
          <div style={{
            color: "#d4af37", fontFamily: "Amiri, serif",
            fontSize: "18px", marginBottom: "20px",
            textShadow: "0 0 20px rgba(212,175,55,0.4)",
          }}>
            بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
          </div>

          {/* Progress bar */}
          <div style={{
            width: "220px", height: "2px",
            background: "rgba(212,175,55,0.1)",
            borderRadius: "2px", overflow: "hidden",
            margin: "0 auto",
          }}>
            <div style={{
              height: "100%", width: `${progress}%`,
              background: "linear-gradient(90deg, #d4af37, #f0d060)",
              borderRadius: "2px",
              boxShadow: "0 0 8px rgba(212,175,55,0.8)",
              transition: "width 0.1s linear",
            }} />
          </div>
          <div style=
            {{
            color: "rgba(212,175,55,0.5)", fontSize: "11px",
            fontFamily: "Tajawal, sans-serif", marginTop: "12px",
          }}>
            جاري التحميل...
          </div>
        </div>
      </div>
    </>
  );
}
