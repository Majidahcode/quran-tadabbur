"use client";
import { useState, useEffect } from "react";

export default function OpenTadabburBook({ onClick }) {
  const [hovered, setHovered] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % 3), 4500);
    return () => clearInterval(t);
  }, []);

  const slides = [
    {
      left: {
        title: "مختصر الوجه",
        icon: "📜",
        items: ["الله الحي القيوم", "المحكم والمتشابه", "دعاء الثبات"],
      },
      right: {
        type: "insight",
        label: "المحكم والمتشابه",
        desc: "الأساس الذي لا يتغير، القواعد الواضحة التي تجعل حياتك تمشي صح.",
      },
    },
    {
      left: {
        title: "كيف أطبّق اليوم؟",
        icon: "🎯",
        items: ["رجوع للأساس", "ثقة بالحكيم", "دعاء بصدق"],
      },
      right: {
        type: "practical",
        label: "تطبيق عملي",
        desc: "لو واجهت شيئًا في حياتك ما فهمته، ارجع للأشياء الواضحة والأساسية في دينك.",
      },
    },
    {
      left: {
        title: "Insights",
        icon: "✨",
        items: ["الراسخون في العلم", "الإيمان بالمتشابه", "التوكل الكامل"],
      },
      right: {
        type: "message",
        label: "رسالة لك",
        desc: "أنت موجود في القرآن. ربك يقول: (لَقَدۡ أَنزَلۡنَآ إِلَيۡكُمۡ كِتَٰبٗا فِيهِ ذِكۡرُكُمۡ)",
      },
    },
  ];

  const s = slides[slide];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        width: "340px",
        height: "220px",
        position: "relative",
        transform: hovered
          ? "translateY(-10px) scale(1.03)"
          : "translateY(0) scale(1)",
        transition: "transform 0.5s cubic-bezier(.2,.8,.3,1)",
        filter: hovered
          ? "drop-shadow(0 28px 50px rgba(0,0,0,0.8)) drop-shadow(0 0 30px rgba(45,138,94,0.2))"
          : "drop-shadow(0 18px 36px rgba(0,0,0,0.65))",
      }}
    >
      {/* Shadow */}
      <div
        style={{
          position: "absolute",
          bottom: "-14px",
          left: "10%",
          right: "10%",
          height: "18px",
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(7px)",
        }}
      />

      {/* Spine */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "12px",
          transform: "translateX(-50%)",
          background: "linear-gradient(90deg, #1a0900, #3a1a02, #1a0900)",
          zIndex: 10,
          boxShadow: "0 0 10px rgba(0,0,0,0.8)",
          borderRadius: "2px",
        }}
      />

      {/* Left page – Section titles */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: "50%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0a1f12 0%, #0e2a18 60%, #122e1e 100%)",
          borderRadius: "8px 0 0 8px",
          padding: "14px 10px 14px 14px",
          boxSizing: "border-box",
          overflow: "hidden",
          border: "1px solid rgba(45,138,94,0.3)",
          borderRight: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "6px",
            border: "1px solid rgba(45,138,94,0.15)",
            borderRadius: "4px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            direction: "rtl",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "4px",
            }}
          >
            <span style={{ fontSize: "12px" }}>{s.left.icon}</span>
            <span
              style={{
                color: "#4aaa6a",
                fontFamily: "Tajawal, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {s.left.title}
            </span>
          </div>
          <div
            style={{
              width: "80%",
              height: "1px",
              background: "linear-gradient(90deg, #2d8a5e, transparent)",
              marginBottom: "4px",
            }}
          />
          {s.left.items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#2d8a5e",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  color: "rgba(200,230,210,0.8)",
                  fontFamily: "Tajawal, sans-serif",
                  fontSize: "10px",
                  lineHeight: 1.5,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right page – Insight/practical/message */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          right: 0,
          height: "100%",
          background:
            "linear-gradient(135deg, #0d1f12 0%, #071408 60%, #040f08 100%)",
          borderRadius: "0 8px 8px 0",
          padding: "14px 14px 14px 10px",
          boxSizing: "border-box",
          overflow: "hidden",
          border: "1px solid rgba(212,175,55,0.2)",
          borderLeft: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "6px",
            border: "1px solid rgba(212,175,55,0.1)",
            borderRadius: "4px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            direction: "rtl",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background:
                s.right.type === "message"
                  ? "rgba(212,175,55,0.1)"
                  : "rgba(45,138,94,0.1)",
              border: `1px solid ${
                s.right.type === "message"
                  ? "rgba(212,175,55,0.25)"
                  : "rgba(45,138,94,0.25)"
              }`,
              borderRadius: "20px",
              padding: "2px 8px",
              alignSelf: "flex-start",
            }}
          >
            <span
              style={{
                color: s.right.type === "message" ? "#d4af37" : "#4aaa6a",
                fontSize: "9px",
                fontFamily: "Tajawal, sans-serif",
              }}
            >
              {s.right.type === "message"
                ? "💌"
                : s.right.type === "practical"
                ? "🎯"
                : "💡"}{" "}
              {s.right.label}
            </span>
          </div>
          <p
            style={{
              color: "rgba(210,225,215,0.85)",
              fontFamily: "Tajawal, sans-serif",
              fontSize: "10px",
              lineHeight: "1.75",
              margin: 0,
              overflow: "hidden",
            }}
          >
            {s.right.desc}
          </p>
          <div
            style={{
              width: "60%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, #d4af37, transparent)",
              marginTop: "auto",
            }}
          />
        </div>
      </div>

      {/* Back covers */}
      <div
        style={{
          position: "absolute",
          top: 2,
          left: -4,
          right: "50%",
          height: "100%",
          background: "#1a0900",
          borderRadius: "8px 0 0 8px",
          zIndex: -1,
          border: "1px solid rgba(180,120,40,0.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 2,
          left: "50%",
          right: -4,
          height: "100%",
          background: "#1a0900",
          borderRadius: "0 8px 8px 0",
          zIndex: -1,
          border: "1px solid rgba(180,120,40,0.15)",
        }}
      />

      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(45,138,94,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 20,
            borderRadius: "8px",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          bottom: "-28px",
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#4aaa6a",
          fontSize: "12px",
          fontFamily: "Tajawal, sans-serif",
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 0.3s",
        }}
      >
        ✦ كتاب التدبر
      </div>
    </div>
  );
}
