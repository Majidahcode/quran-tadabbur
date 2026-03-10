"use client";
import { useState, useEffect } from "react";

export default function OpenQuranBook({ onClick }) {
  const [hovered, setHovered] = useState(false);
  const [pageFlip, setPageFlip] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPageFlip((p) => (p + 1) % 3), 4000);
    return () => clearInterval(t);
  }, []);

  const leftPageTexts = [
    "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ\nٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ ﴿٢﴾\nٱلرَّحۡمَٰنِ ٱلرَّحِيمِ ﴿٣﴾\nمَٰلِكِ يَوۡمِ ٱلدِّينِ ﴿٤﴾\nإِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ ﴿٥﴾\nٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ ﴿٦﴾\nصِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ ﴿٧﴾",
    "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ\nٱلۡحَيُّ ٱلۡقَيُّومُ ﴿٢﴾\nنَزَّلَ عَلَيۡكَ ٱلۡكِتَٰبَ بِٱلۡحَقِّ ﴿٣﴾\nمُصَدِّقٗا لِّمَا بَيۡنَ يَدَيۡهِ\nوَأَنزَلَ ٱلتَّوۡرَىٰةَ وَٱلۡإِنجِيلَ ﴿٤﴾",
    "قُلۡ هُوَ ٱللَّهُ أَحَدٌ ﴿١﴾\nٱللَّهُ ٱلصَّمَدُ ﴿٢﴾\nلَمۡ يَلِدۡ وَلَمۡ يُولَدۡ ﴿٣﴾\nوَلَمۡ يَكُن لَّهُۥ\nكُفُوًا أَحَدُۢ ﴿٤﴾",
  ];
  const rightPageNums = ["١", "٥٠", "٦٠٢"];
  const rightSurahs = ["الفاتحة", "آل عمران", "الإخلاص"];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        width: "360px",
        height: "240px",
        position: "relative",
        transform: hovered
          ? "translateY(-10px) scale(1.03)"
          : "translateY(0) scale(1)",
        transition: "transform 0.5s cubic-bezier(.2,.8,.3,1)",
        filter: hovered
          ? "drop-shadow(0 28px 50px rgba(0,0,0,0.8)) drop-shadow(0 0 30px rgba(212,175,55,0.2))"
          : "drop-shadow(0 18px 36px rgba(0,0,0,0.7))",
      }}
    >
      {/* Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: "-16px",
          left: "10%",
          right: "10%",
          height: "20px",
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(8px)",
        }}
      />

      {/* Spine */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "14px",
          transform: "translateX(-50%)",
          background: "linear-gradient(90deg, #0a1f0d, #1a4020, #0a1f0d)",
          zIndex: 10,
          boxShadow: "0 0 12px rgba(0,0,0,0.8), 2px 0 4px rgba(0,0,0,0.4)",
          borderRadius: "2px",
        }}
      />

      {/* Left page – Quran text */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: "50%",
          height: "100%",
          background:
            "linear-gradient(110deg, #fdf8ec 0%, #f5eedb 60%, #ede3c8 100%)",
          borderRadius: "8px 0 0 8px",
          padding: "14px 10px 14px 16px",
          boxSizing: "border-box",
          overflow: "hidden",
          boxShadow:
            "inset -8px 0 16px rgba(0,0,0,0.15), inset 0 0 20px rgba(200,180,120,0.1)",
          borderLeft: "2px solid #c9a53a",
          borderTop: "1px solid #c9a53a",
          borderBottom: "1px solid #c9a53a",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "6px",
            border: "1px solid rgba(160,130,60,0.25)",
            borderRadius: "4px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            direction: "rtl",
            fontFamily: "Amiri Quran, Amiri, serif",
            fontSize: "10.5px",
            lineHeight: "1.85",
            color: "#1a0e00",
            textAlign: "justify",
            whiteSpace: "pre-line",
            paddingTop: "6px",
            overflowY: "hidden",
            height: "100%",
          }}
        >
          {leftPageTexts[pageFlip]}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#8a6a22",
            fontSize: "9px",
            fontFamily: "Amiri, serif",
          }}
        >
          — {rightPageNums[pageFlip]} —
        </div>
      </div>

      {/* Right page – Surah title */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          right: 0,
          height: "100%",
          background:
            "linear-gradient(70deg, #ede3c8 0%, #f5eedb 50%, #fdf8ec 100%)",
          borderRadius: "0 8px 8px 0",
          padding: "14px 16px 14px 10px",
          boxSizing: "border-box",
          overflow: "hidden",
          boxShadow:
            "inset 8px 0 16px rgba(0,0,0,0.08), inset 0 0 20px rgba(200,180,120,0.08)",
          borderRight: "2px solid #c9a53a",
          borderTop: "1px solid #c9a53a",
          borderBottom: "1px solid #c9a53a",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "6px",
            border: "1px solid rgba(160,130,60,0.25)",
            borderRadius: "4px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            direction: "rtl",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              height: "1px",
              background:
                "linear-gradient(90deg,transparent,#c9a53a,transparent)",
            }}
          />
          <div style={{ color: "#c9a53a", fontSize: "13px" }}>✦</div>
          <div
            style={{
              color: "#1a0e00",
              fontFamily: "Amiri, serif",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            سورة {rightSurahs[pageFlip]}
          </div>
          <div
            style={{
              color: "#7a5820",
              fontFamily: "Amiri, serif",
              fontSize: "10px",
            }}
          >
            جزء {pageFlip === 0 ? "١" : pageFlip === 1 ? "٣" : "٣٠"}
          </div>
          <div
            style={{
              width: "70%",
              height: "1px",
              background:
                "linear-gradient(90deg,transparent,#c9a53a,transparent)",
            }}
          />
          {[85, 75, 90, 65, 80, 70].map((w, i) => (
            <div
              key={i}
              style={{
                width: `${w}%`,
                height: "1.5px",
                background: `rgba(100,70,20,${0.12 + (i % 2) * 0.06})`,
                borderRadius: "2px",
              }}
            />
          ))}
          <div
            style={{
              color: "#c9a53a",
              fontSize: "11px",
              marginTop: "4px",
              fontFamily: "Amiri, serif",
            }}
          >
            بِسۡمِ ٱللَّهِ
          </div>
          <div
            style={{
              width: "70%",
              height: "1px",
              background:
                "linear-gradient(90deg,transparent,#c9a53a,transparent)",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#8a6a22",
            fontSize: "9px",
            fontFamily: "Amiri, serif",
          }}
        >
          — {rightPageNums[pageFlip]} —
        </div>
      </div>

      {/* Back covers */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: "50%",
          height: "100%",
          background: "linear-gradient(90deg, #071810 0%, #0c2d16 100%)",
          borderRadius: "8px 0 0 8px",
          zIndex: -1,
          transform: "translateX(-4px)",
          border: "1px solid rgba(212,175,55,0.2)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          right: 0,
          height: "100%",
          background: "linear-gradient(90deg, #0c2d16 0%, #071810 100%)",
          borderRadius: "0 8px 8px 0",
          zIndex: -1,
          transform: "translateX(4px)",
          border: "1px solid rgba(212,175,55,0.2)",
        }}
      />

      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 20,
            borderRadius: "8px",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          bottom: "-32px",
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#d4af37",
          fontSize: "12px",
          fontFamily: "Tajawal, sans-serif",
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 0.3s",
          textShadow: "0 0 10px rgba(212,175,55,0.4)",
        }}
      >
        ✦ اضغط للقراءة والتدبر
      </div>
    </div>
  );
}
