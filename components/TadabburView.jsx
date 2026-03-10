"use client";
import { X, Lightbulb, Target, ScrollText, MessageCircle, Sparkles } from "lucide-react";
import { ALL_SURAHS } from "@/data/surahs";

export default function TadabburView({ page, onClose, userName }) {
  const surahInfo = ALL_SURAHS.find((s) => s.n === page.surahNum);

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
          borderBottom: "1px solid rgba(45,138,94,0.15)",
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
              color: "#4aaa6a",
              fontSize: "18px",
              fontFamily: "Amiri, serif",
              fontWeight: 700,
            }}
          >
            كتاب التدبر   — {page.title}
          </div>
          <div
            style={{
              color: "rgba(200,200,180,0.5)",
              fontSize: "12px",
              fontFamily: "Tajawal, sans-serif",
            }}
          >
            سورة {surahInfo?.ar} · الآيات {page.verses}
          </div>
        </div>
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
          <X size={18} color="#4aaa6a" />
        </button>
      </div>

      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "32px 24px 60px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Personal message */}
        {(page.userMessage || userName) && (
          <div
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(45,138,94,0.06))",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: "20px",
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <MessageCircle size={17} color="#d4af37" />
              <span
                style={{
                  color: "#d4af37",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "Tajawal, sans-serif",
                }}
              >
                رسالة من القرآن {userName ? `إليك يا ${userName}` : "إليك"}
              </span>
            </div>
            <p
              style={{
                color: "rgba(240,232,192,0.85)",
                fontSize: "16px",
                lineHeight: "2",
                margin: 0,
                fontFamily: "Amiri, serif",
              }}
            >
              {page.userMessage ||
                "هذا الكلام نزل من عند الله ووصل إليك أنت. فتدبّره وعش به."}
            </p>
          </div>
        )}

        {/* Thematic flow */}
        {page.thematicFlow && page.thematicFlow.length > 0 && (
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px",
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <ScrollText size={17} color="#4aaa6a" />
              <span
                style={{
                  color: "#4aaa6a",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "Tajawal, sans-serif",
                }}
              >
                مختصر الوجه
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {page.thematicFlow.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "rgba(45,138,94,0.15)",
                      border: "1px solid rgba(45,138,94,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4aaa6a",
                      fontSize: "11px",
                      flexShrink: 0,
                      fontFamily: "Tajawal, sans-serif",
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    style={{
                      color: "rgba(200,220,210,0.8)",
                      fontSize: "14px",
                      lineHeight: "1.7",
                      margin: 0,
                      fontFamily: "Tajawal, sans-serif",
                      paddingTop: "2px",
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insights */}
        {page.insights && page.insights.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "14px",
              }}
            >
              <Sparkles size={17} color="#d4af37" />
              <span
                style={{
                  color: "#d4af37",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "Tajawal, sans-serif",
                }}
              >
                Insights
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "14px",
              }}
            >
              {page.insights.map((ins, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(212,175,55,0.05)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    borderRadius: "16px",
                    padding: "18px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <Lightbulb size={14} color="#d4af37" />
                    <span
                      style={{
                        color: "#d4af37",
                        fontSize: "13px",
                        fontWeight: 600,
                        fontFamily: "Tajawal, sans-serif",
                      }}
                    >
                      {ins.label}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "rgba(220,210,170,0.8)",
                      fontSize: "13px",
                      lineHeight: "1.8",
                      margin: 0,
                      fontFamily: "Tajawal, sans-serif",
                    }}
                  >
                    {ins.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practical application */}
        {page.practical && (
          <div
            style={{
              background: "rgba(212,175,55,0.06)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <Target size={17} color="#d4af37" />
              <span
                style={{
                  color: "#d4af37",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "Tajawal, sans-serif",
                }}
              >
                كيف أطبّق هذا اليوم؟
              </span>
            </div>
            <p
              style={{
                color: "rgba(230,220,180,0.9)",
                fontSize: "14px",
                lineHeight: "1.9",
                margin: 0,
                fontFamily: "Tajawal, sans-serif",
              }}
            >
              {page.practical}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
