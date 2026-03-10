"use client";
import { useState } from "react";
import { Heart, User } from "lucide-react";

export default function HeartCard({ userName, setUserName, userGender, setUserGender }) {
  const [inputVal, setInputVal] = useState(userName || "");

  return (
    <>
      <style>{`
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.1), 0 8px 32px rgba(0,0,0,0.3); }
          50% { box-shadow: 0 0 35px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.3); }
        }
        .gender-btn {
          flex: 1;
          padding: 8px;
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 10px;
          font-family: Tajawal, sans-serif;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          background: rgba(255,255,255,0.03);
          color: rgba(200,200,180,0.6);
        }
        .gender-btn.active {
          background: linear-gradient(135deg, rgba(212,175,55,0.2), rgba(45,138,94,0.15));
          border-color: rgba(212,175,55,0.45);
          color: #e8c84a;
          box-shadow: 0 0 12px rgba(212,175,55,0.15);
        }
        .gender-btn:hover:not(.active) {
          background: rgba(255,255,255,0.06);
          border-color: rgba(212,175,55,0.3);
          color: rgba(200,200,180,0.8);
        }
        .heart-input:focus {
          outline: none;
          border-color: rgba(212,175,55,0.4) !important;
          box-shadow: 0 0 12px rgba(212,175,55,0.1);
        }
        .submit-btn:hover {
          background: linear-gradient(135deg, rgba(212,175,55,0.4), rgba(45,138,94,0.3)) !important;
          box-shadow: 0 6px 20px rgba(212,175,55,0.25) !important;
        }
      `}</style>
      <div style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(212,175,55,0.15)",
        borderRadius: "20px",
        padding: "20px",
        width: "100%",
        direction: "rtl",
        animation: "cardGlow 4s ease-in-out infinite",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Top glow line */}
        <div style={{
          position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
        }} />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Heart size={17} color="#d4af37" fill="rgba(212,175,55,0.3)" />
          </div>
          <div>
            <div style={{ color: "#d4af37", fontSize: "13px", fontWeight: 700, fontFamily: "Tajawal, sans-serif" }}>
              رسالة من القلب
            </div>
            <div style={{ color: "rgba(200,200,180,0.45)", fontSize: "11px", fontFamily: "Tajawal, sans-serif" }}>
              {userName ? `✨ مرحباً ${userName}` : "انت مذكور في القران ❤️‍🩹 (لَقَدْ أَنزَلْنَا إِلَيْكُمْ كِتَابًا فِيهِ ذِكْرُكُمْ ۖ أَفَلَا تَعْقِلُونَ)  "}
            </div>
          </div>
        </div>

        {/* Gender selection */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ color: "rgba(200,200,180,0.5)", fontSize: "11px", fontFamily: "Tajawal, sans-serif", marginBottom: "6px", display: "flex", alignItems: "center", gap: "5px" }}>
            <User size={11} />
            <span>اختر جنسك لتخصيص الرسائل</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className={`gender-btn ${userGender === "male" ? "active" : ""}`}
              onClick={() => setUserGender("male")}
            >
              👤 ذكر
            </button>
            <button
              className={`gender-btn ${userGender === "female" ? "active" : ""}`}
              onClick={() => setUserGender("female")}
            >
              👤 أنثى
            </button>
          </div>
        </div>

        {/* Name input */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ color: "rgba(200,200,180,0.5)", fontSize: "11px", fontFamily: "Tajawal, sans-serif", marginBottom: "6px" }}>
            اسمك
          </div>
          <input
            className="heart-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setUserName(inputVal)}
            placeholder="اكتب اسمك هنا..."
            dir="rtl"
            style={{
              width: "100%", boxSizing: "border-box",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(212,175,55,0.18)",
              borderRadius: "10px", padding: "10px 14px",
              color: "#f0e8c0",
              fontFamily: "Tajawal, sans-serif", fontSize: "14px",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          />
        </div>

        <button
          className="submit-btn"
          onClick={() => setUserName(inputVal)}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, rgba(212,175,55,0.22), rgba(45,138,94,0.18))",
            border: "1px solid rgba(212,175,55,0.35)",
            borderRadius: "10px", padding: "10px",
            color: "#e8c84a",
            fontFamily: "Tajawal, sans-serif", fontSize: "13px",
            cursor: "pointer", fontWeight: 600,
            transition: "all 0.2s",
          }}
        >
          {userName ? `✦ مرحباً ${userName} 💛` : "ابدأ رحلتك ✦"}
        </button>
      </div>
    </>
  );
}
