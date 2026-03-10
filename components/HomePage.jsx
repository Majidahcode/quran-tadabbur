"use client";
import { useState, useEffect, useRef } from "react";
import QuranStand from "./QuranStand";
import TadabburBook from "./TadabburBook";
import HeartCard from "./HeartCard";
import { ALL_SURAHS } from "@/data/surahs";
import { Search, ChevronDown } from "lucide-react";

export default function HomePage({
  userName, setUserName, userGender, setUserGender,
  selectedSurahNum, onSelectSurah,
  wajhs, currentWajhIdx, onPrevWajh, onNextWajh,
  tadabburData, isAnimating, isLoading,
}) {
  const [pulse,      setPulse]      = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [winW,       setWinW]       = useState(1200);
  const dropRef = useRef(null);
  const selectedSurah = ALL_SURAHS.find((s) => s.n === selectedSurahNum);

  /* ── responsive ── */
  useEffect(() => {
    const update = () => setWinW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // breakpoints
  const isMobile = winW < 640;
  const isTablet = winW >= 640 && winW < 1024;

  // QuranStand natural dims ≈ 480px W × 530px H (book 292 + rahl 170 + label)
  // TadabburBook natural dims ≈ 320px W × 310px H (book 280 + depth+label)
  const bookScale  = isMobile ? 0.58 : isTablet ? 0.74 : 1;
  const tadabScale = isMobile ? 0.72 : isTablet ? 0.84 : 1;

  // Negative margin to collapse whitespace left by transform:scale (layout doesn't reflow)
  const bookMB  = -Math.round((1 - bookScale)  * 530 * 0.85);
  const tadabMB = -Math.round((1 - tadabScale) * 310 * 0.85);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = ALL_SURAHS.filter(
    (s) => s.ar.includes(searchText) || String(s.n).includes(searchText)
  ).slice(0, 10);

  return (
    <>
      <style>{`
        @keyframes beamPulse {
          0%,100% { opacity:.55; transform:translateX(-50%) scaleX(1); }
          50%      { opacity:.85; transform:translateX(-50%) scaleX(1.1); }
        }
        @keyframes topGlowPulse    { 0%,100%{opacity:.6}  50%{opacity:1}   }
        @keyframes bottomGlowPulse { 0%,100%{opacity:.5}  50%{opacity:.9}  }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .surah-row:hover {
          background:rgba(212,175,55,0.12) !important;
          border-color:rgba(212,175,55,0.35) !important;
        }
        .sel-card:hover { background:rgba(212,175,55,0.1) !important; }
        .src-in:focus   { outline:none; border-color:rgba(212,175,55,0.5) !important; }
      `}</style>



      {/* ══ PAGE ══ */}
      <div style={{
        minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        padding: isMobile ? "20px 14px" : isTablet ? "32px 24px" : "40px 32px",
        boxSizing:"border-box", position:"relative", zIndex:2,
      }}>
        <div style={{
          display:"flex",
          // Stack vertically on mobile, side-by-side on wider screens
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "center" : "center",
          justifyContent:"center",
          gap: isMobile ? "0px" : isTablet ? "32px" : "64px",
          width:"100%", maxWidth:"1300px",
        }}>

          {/* ════ BOOKS COLUMN ════ */}
          <div style={{
            display:"flex", flexDirection:"column", alignItems:"center",
            animation:"fadeUp 0.9s 0.1s both",
            // Prevent this column from growing wider than viewport
            maxWidth: isMobile ? "100vw" : "none",
            overflow:"visible",
          }}>

            {/* — QuranStand — */}
            <div style={{
              transform:`scale(${bookScale})`,
              transformOrigin:"top center",
              marginBottom: isMobile ? `${bookMB}px` : isTablet ? `${bookMB + 40}px` : "-18px",
              zIndex:2, position:"relative",
            }}>
              <QuranStand
                surahName={selectedSurah?.ar}
                surahNum={selectedSurahNum}
                wajhs={wajhs}
                currentWajhIdx={currentWajhIdx}
                onPrevWajh={onPrevWajh}
                onNextWajh={onNextWajh}
                userName={userName}
                userGender={userGender}
              />
            </div>

            {/* — TadabburBook — */}
            <div style={{
              transform:`scale(${tadabScale})`,
              transformOrigin: isMobile ? "top center" : "top right",
              marginBottom: isMobile ? `${tadabMB}px` : isTablet ? `${tadabMB + 20}px` : "0",
              alignSelf: isMobile ? "center" : "flex-end",
              marginRight: isMobile ? "0" : "16px",
              marginTop: (!isMobile && !isTablet) ? "20px" : "0",
            }}>
              <TadabburBook
                tadabburData={tadabburData}
                isAnimating={isAnimating}
                isLoading={isLoading}
                userName={userName}
                userGender={userGender}
                surahName={selectedSurah?.ar}
              />
            </div>
          </div>

          {/* ════ INFO COLUMN ════ */}
          <div style={{
            flex:"1 1 300px",
            minWidth:0,
            direction:"rtl",
            display:"flex", flexDirection:"column",
            gap: isMobile ? "14px" : "22px",
            animation:"fadeUp 0.9s 0.3s both",
            width: isMobile ? "100%" : "auto",
            // Add spacing from books on mobile
            marginTop: isMobile ? "12px" : "0",
          }}>

            {/* Logo */}
            <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
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
  <div style={{ marginTop: "8px" }}>
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
              <div>
                <div style={{ color:"rgba(200,220,200,.4)",fontSize:"10px",letterSpacing:"3px",fontFamily:"Tajawal,sans-serif" }}>QURAN TADABBUR</div>
                <div style={{ color:"#d4af37",fontSize:"13px",fontFamily:"Tajawal,sans-serif" }}>مصحف التدبر</div>
              </div>
            </div>

            {/* Title */}
            <h1 style={{
              margin:0,
              fontFamily:"Amiri,'Traditional Arabic',serif",
              fontSize: isMobile ? "clamp(30px,10vw,42px)" : "clamp(40px,5.5vw,68px)",
              lineHeight:1.3,
              background:"linear-gradient(135deg,#f0d060 0%,#d4af37 40%,#8aba7a 80%,#e8c84a 100%)",
              WebkitBackgroundClip:"text", backgroundClip:"text",
              WebkitTextFillColor:"transparent",
              filter:`drop-shadow(0 0 ${pulse?"22px":"10px"} rgba(212,175,55,.38))`,
              transition:"filter 1.5s ease",
            }}>
              القرآن الكريم
            </h1>

            <p style={{
              margin:0, color:"rgba(200,220,200,.6)",
              fontSize: isMobile?"12px":"15px",
              lineHeight:"1.85", fontFamily:"Tajawal,sans-serif",
            }}>
اذا اردت ان تكلم الله فعليك بالصلاه , واذا اردت ان يكلمك الله فعليك عليك عليك بالقرآن  ❤️‍🩹             </p>
<br />كل هالارقام موجوده عبث لاا وربي انا وانت موجودين في القران ..دور على نفسك في فهرسك دليلك ي انسان
            {/* Stats */}
            <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
              {[{n:"١١٤",l:"سورة"},{n:"٦٢٣٦",l:"آية"},{n:"٣٠",l:"جزءاً"}].map((s) => (
                <div key={s.l} style={{
                  background:"rgba(255,255,255,.03)",
                  border:"1px solid rgba(212,175,55,.1)",
                  borderRadius:"14px",
                  padding: isMobile ? "7px 12px" : "10px 18px",
                  textAlign:"center", position:"relative", overflow:"hidden",
                }}>
                  <div style={{ position:"absolute",top:0,left:"15%",right:"15%",height:"1px",
                    background:"linear-gradient(90deg,transparent,rgba(212,175,55,.55),transparent)" }}/>
                  <div style={{ color:"#d4af37",fontSize:isMobile?"15px":"20px",fontFamily:"Amiri,serif",fontWeight:700 }}>{s.n}</div>
                  <div style={{ color:"rgba(200,200,180,.4)",fontSize:"10px",fontFamily:"Tajawal,sans-serif",marginTop:"2px" }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Surah Selector */}
            <div ref={dropRef} style={{ position:"relative" }}>
              <div style={{ color:"rgba(200,200,180,.4)",fontSize:"11px",fontFamily:"Tajawal,sans-serif",marginBottom:"7px" }}>
اختر السوره الي قريبه من قلبك               </div>

              {/* Selected surah card */}
              <div
                className="sel-card"
                onClick={() => setSearchOpen((o) => !o)}
                style={{
                  background:"rgba(212,175,55,.05)", border:"1px solid rgba(212,175,55,.2)",
                  borderRadius:"14px", padding:"11px 14px", cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  transition:"background .2s", position:"relative", overflow:"hidden",
                }}
              >
                <div style={{ position:"absolute",top:0,left:"20%",right:"20%",height:"1px",
                  background:"linear-gradient(90deg,transparent,rgba(212,175,55,.4),transparent)" }}/>
                <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <div style={{
                    width:"32px",height:"32px",borderRadius:"9px",
                    background:"rgba(212,175,55,.1)",border:"1px solid rgba(212,175,55,.2)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    color:"#d4af37",fontSize:"12px",fontFamily:"Amiri,serif",
                  }}>{selectedSurahNum}</div>
                  <div>
                    <div style={{ color:"#e8c84a",fontSize:"15px",fontFamily:"Amiri,serif" }}>{selectedSurah?.ar}</div>
                    <div style={{ color:"rgba(200,200,180,.38)",fontSize:"10px",fontFamily:"Tajawal,sans-serif" }}>
                      {selectedSurah?.vs} آية · جزء {selectedSurah?.jz} · {selectedSurah?.ty}
                    </div>
                  </div>
                </div>
                <ChevronDown size={14} color="rgba(212,175,55,.5)"
                  style={{ transform:searchOpen?"rotate(180deg)":"rotate(0deg)",transition:"transform .2s" }}/>
              </div>

              {/* Dropdown */}
              {searchOpen && (
                <div style={{
                  position:"absolute", top:"calc(100% + 8px)",
                  left:0, right:0, zIndex:50,
                  background:"rgba(4,14,8,.97)", backdropFilter:"blur(24px)",
                  border:"1px solid rgba(212,175,55,.18)",
                  borderRadius:"14px", padding:"12px",
                  maxHeight:"240px", overflowY:"auto",
                  boxShadow:"0 20px 50px rgba(0,0,0,.6)",
                }}>
                  <div style={{ position:"relative",marginBottom:"8px" }}>
                    <Search size={13} color="rgba(212,175,55,.45)"
                      style={{ position:"absolute",right:"10px",top:"50%",transform:"translateY(-50%)" }}/>
                    <input
                      className="src-in"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="ابحث عن سورة..."
                      dir="rtl"
                      autoFocus
                      style={{
                        width:"100%",boxSizing:"border-box",
                        background:"rgba(255,255,255,.05)",
                        border:"1px solid rgba(212,175,55,.18)",
                        borderRadius:"9px",padding:"8px 34px 8px 12px",
                        color:"#f0e8c0",fontFamily:"Tajawal,sans-serif",fontSize:"13px",
                      }}
                    />
                  </div>
                  <div style={{ display:"flex",flexDirection:"column",gap:"3px" }}>
                    {filtered.map((s) => (
                      <div
                        key={s.n}
                        className="surah-row"
                        onClick={() => { onSelectSurah(s.n); setSearchOpen(false); setSearchText(""); }}
                        style={{
                          display:"flex",alignItems:"center",gap:"10px",
                          padding:"8px 10px",borderRadius:"10px",
                          cursor:"pointer",direction:"rtl",
                          background: s.n===selectedSurahNum ? "rgba(212,175,55,.1)" : "transparent",
                          border:`1px solid ${s.n===selectedSurahNum?"rgba(212,175,55,.22)":"rgba(255,255,255,.03)"}`,
                          transition:"all .15s",
                        }}
                      >
                        <span style={{ color:"rgba(212,175,55,.5)",fontSize:"10px",fontFamily:"Amiri,serif",minWidth:"18px" }}>{s.n}</span>
                        <span style={{ color:"#e8c84a",fontSize:"13px",fontFamily:"Amiri,serif" }}>{s.ar}</span>
                        <span style={{ color:"rgba(200,200,180,.3)",fontSize:"10px",fontFamily:"Tajawal,sans-serif",marginRight:"auto" }}>{s.vs} آية</span>
                      </div>
                    ))}
                    {filtered.length===0 && (
                      <div style={{ color:"rgba(200,200,180,.35)",textAlign:"center",padding:"12px",fontFamily:"Tajawal,sans-serif",fontSize:"13px" }}>
                        لا توجد نتائج
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* HeartCard */}
            <HeartCard
              userName={userName} setUserName={setUserName}
              userGender={userGender} setUserGender={setUserGender}
            />
          </div>
        </div>
      </div>
    </>
  );
}
