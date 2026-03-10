"use client";
import { useState } from "react";
import { ChevronRight, ChevronLeft, X, BookOpen } from "lucide-react";
import { SURAH_PAGES } from "@/data/surahPages";
import { ALL_SURAHS } from "@/data/surahs";

export default function QuranReader({ surahNum, onClose, onTadabbur, userName }) {
  const pages = SURAH_PAGES[surahNum] || null;
  const surahInfo = ALL_SURAHS.find((s) => s.n === surahNum);
  const [pageIdx, setPageIdx] = useState(0);

  if (!pages) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(4,14,8,0.97)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          direction: "rtl",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "400px" }}>
          <div style={{ fontSize: "60px", marginBottom: "16px" }}>📖</div>
          <div
            style={{
              color: "#d4af37",
              fontSize: "22px",
              fontFamily: "Amiri, serif",
              marginBottom: "12px",
            }}
          >
            سورة {surahInfo?.ar}
          </div>
          <p
            style={{
              color: "rgba(200,200,180,0.6)",
              fontFamily: "Tajawal, sans-serif",
              fontSize: "15px",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}
          >
            محتوى التدبر لهذه السورة قيد الإعداد ✨
            <br />
            سيُضاف قريبًا بإذن الله
          </p>
          <button
            onClick={onClose}
            style={{
              background: "rgba(212,175,55,0.15)",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "12px",
              padding: "10px 24px",
              color: "#d4af37",
              fontFamily: "Tajawal, sans-serif",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            العودة للفهرس
          </button>
        </div>
      </div>
    );
  }

  const page = pages[pageIdx];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(4,14,8,0.97)",
        backdropFilter: "blur(10px)",
        overflowY: "auto",
        direction: "rtl",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "rgba(4,14,8,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <div>
          <div
            style={{
              color: "#d4af37",
              fontSize: "18px",
              fontFamily: "Amiri, serif",
              fontWeight: 700,
            }}
          >
            سورة {surahInfo?.ar}
          </div>
          <div
            style={{
              color: "rgba(200,200,180,0.5)",
              fontSize: "12px",
              fontFamily: "Tajawal, sans-serif",
            }}
          >
            الآيات {page.verses} · {page.title}
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={() => onTadabbur(page)}
            style={{
              background: "linear-gradient(135deg, rgba(45,138,94,0.3), rgba(45,138,94,0.15))",
              border: "1px solid rgba(45,138,94,0.4)",
              borderRadius: "10px",
              padding: "8px 16px",
              color: "#4aaa6a",
              fontFamily: "Tajawal, sans-serif",
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <BookOpen size={14} />
            تدبر هذا الوجه
          </button>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={18} color="#d4af37" />
          </button>
        </div>
      </div>

      {/* Mushaf page */}
      <div
        style={{
          maxWidth: "700px",
          margin: "32px auto",
          padding: "0 24px",
        }}
      >
        {/* Page */}
        <div
          style={{
            background: "linear-gradient(160deg, #fdf8ec 0%, #f5eedb 60%, #ede3c8 100%)",
            borderRadius: "16px",
            padding: "40px 36px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,165,58,0.3)",
            direction: "rtl",
            position: "relative",
          }}
        >
          {/* Inner border */}
          <div
            style={{
              position: "absolute",
              inset: "12px",
              border: "1px solid rgba(160,130,60,0.2)",
              borderRadius: "10px",
              pointerEvents: "none",
            }}
          />

          {/* Page number */}
          <div
            style={{
              textAlign: "center",
              color: "#8a6a22",
              fontSize: "12px",
              fontFamily: "Amiri, serif",
              marginBottom: "12px",
            }}
          >
            ص {page.page}
          </div>

          {/* Surah header */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div
              style={{
                width: "60%",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #c9a53a, transparent)",
                margin: "0 auto 8px",
              }}
            />
            <div
              style={{
                color: "#1a0e00",
                fontFamily: "Amiri, serif",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              سورة {surahInfo?.ar}
            </div>
            <div
              style={{
                color: "#7a5820",
                fontFamily: "Amiri, serif",
                fontSize: "13px",
                marginTop: "4px",
              }}
            >
              {surahInfo?.ty} · {surahInfo?.vs} آية · جزء {page.juz}
            </div>
            <div
              style={{
                width: "60%",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #c9a53a, transparent)",
                margin: "8px auto 0",
              }}
            />
          </div>

          {/* Basmala */}
          {page.page !== 9 && (
            <div
              style={{
                textAlign: "center",
                color: "#1a0e00",
                fontFamily: "Amiri Quran, Amiri, serif",
                fontSize: "20px",
                marginBottom: "20px",
                letterSpacing: "1px",
              }}
            >
              بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
            </div>
          )}

          {/* Quran text */}
          <p
            style={{
              color: "#1a0e00",
              fontFamily: "Amiri Quran, Amiri, serif",
              fontSize: "22px",
              lineHeight: "2.2",
              textAlign: "justify",
              margin: 0,
            }}
          >
            {page.text}
          </p>

          {/* Footer */}
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#8a6a22",
              fontSize: "12px",
              fontFamily: "Amiri, serif",
            }}
          >
            — {page.verses} —
          </div>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "24px",
            padding: "0 4px",
          }}
        >
          <button
            onClick={() => setPageIdx((p) => Math.max(0, p - 1))}
            disabled={pageIdx === 0}
            style={{
              background: pageIdx === 0 ? "rgba(255,255,255,0.03)" : "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: "12px",
              padding: "10px 20px",
              color: pageIdx === 0 ? "rgba(200,180,100,0.3)" : "#d4af37",
              fontFamily: "Tajawal, sans-serif",
              fontSize: "13px",
              cursor: pageIdx === 0 ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ChevronRight size={16} />
            الوجه السابق
          </button>

          <div
            style={{
              color: "rgba(200,200,180,0.5)",
              fontSize: "13px",
              fontFamily: "Tajawal, sans-serif",
            }}
          >
            {pageIdx + 1} / {pages.length}
          </div>

          <button
            onClick={() => setPageIdx((p) => Math.min(pages.length - 1, p + 1))}
            disabled={pageIdx === pages.length - 1}
            style={{
              background:
                pageIdx === pages.length - 1
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: "12px",
              padding: "10px 20px",
              color:
                pageIdx === pages.length - 1
                  ? "rgba(200,180,100,0.3)"
                  : "#d4af37",
              fontFamily: "Tajawal, sans-serif",
              fontSize: "13px",
              cursor: pageIdx === pages.length - 1 ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            الوجه التالي
            <ChevronLeft size={16} />
          </button>
        </div>

        {/* Tadabbur button */}
        <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "40px" }}>
          <button
            onClick={() => onTadabbur(page)}
            style={{
              background: "linear-gradient(135deg, rgba(45,138,94,0.25), rgba(26,107,60,0.2))",
              border: "1px solid rgba(45,138,94,0.4)",
              borderRadius: "14px",
              padding: "14px 32px",
              color: "#4aaa6a",
              fontFamily: "Tajawal, sans-serif",
              fontSize: "15px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ✦ تدبر هذا الوجه الآن
          </button>
        </div>
      </div>
    </div>
  );
}
