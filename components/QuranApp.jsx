"use client";
import { useState, useEffect, useRef } from "react";
import LoadingScreen from "./LoadingScreen";
import IslamicBackground from "./IslamicBackground";
import HomePage from "./HomePage";
import QuranIndex from "./QuranIndex";
import { SURAH_PAGES } from "@/data/surahPages";

const QURAN_API = "https://api.alquran.cloud/v1/surah";

// Split verses into wajhs (~15 verses each)
function groupIntoWajhs(verses, surahNum, surahName) {
  const WAJH_SIZE = verses.length <= 7 ? verses.length : 15;
  const wajhs = [];
  for (let i = 0; i < verses.length; i += WAJH_SIZE) {
    const chunk = verses.slice(i, i + WAJH_SIZE);
    wajhs.push({
      surahNum,
      surahName,
      wajhIdx: wajhs.length,
      verseFrom: chunk[0].numberInSurah,
      verseTo: chunk[chunk.length - 1].numberInSurah,
      verses: `${chunk[0].numberInSurah} - ${chunk[chunk.length - 1].numberInSurah}`,
      text: chunk.map((v) => `${v.text} ﴿${v.numberInSurah}﴾`).join(" "),
      rawText: chunk.map((v) => v.text).join(" "),
      topics: [],
      heartMessage: "",
      practical: "",
      insights: [],
    });
  }
  return wajhs;
}

export default function QuranApp() {
  const [appReady, setAppReady] = useState(false);
  const [view, setView] = useState("home");
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState("male");
  const [selectedSurahNum, setSelectedSurahNum] = useState(1);
  const [wajhs, setWajhs] = useState(null);
  const [currentWajhIdx, setCurrentWajhIdx] = useState(0);
  const [tadabburData, setTadabburData] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tadabburCache = useRef({});

  // On mount: load Fatiha
  useEffect(() => {
    fetchAndLoadSurah(1);
  }, []);

  const fetchAndLoadSurah = async (surahNum) => {
    setIsLoading(true);
    setTadabburData(null);
    setIsAnimating(true);
    setCurrentWajhIdx(0);

    // Check if we have preloaded data in surahPages.js
    if (SURAH_PAGES[surahNum]) {
      const preloaded = SURAH_PAGES[surahNum];
      setWajhs(preloaded.map((p, i) => ({
        surahNum,
        surahName: p.surahName || "",
        wajhIdx: i,
        verseFrom: parseInt(p.verses?.split("-")[0]?.trim()) || 1,
        verseTo: parseInt(p.verses?.split("-")[1]?.trim()) || 7,
        verses: p.verses,
        text: p.text,
        rawText: p.text,
        topics: p.thematicFlow?.map((t) => t.split("—")[0]?.trim()) || [],
        title: p.title,
        preloaded: p,
      })));
      // Use preloaded tadabbur for first wajh
      const firstPreloaded = preloaded[0];
      setTadabburData({
        title: firstPreloaded.title,
        topics: firstPreloaded.thematicFlow?.map((t) => t.split("—")[0]?.trim()) || [],
        thematicFlow: firstPreloaded.thematicFlow || [],
        insights: firstPreloaded.insights || [],
        practical: firstPreloaded.practical || "",
        heartMessage: firstPreloaded.userMessage || "",
      });
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 900);
      return;
    }

    // Fetch from API
    try {
      const res = await fetch(`${QURAN_API}/${surahNum}/ar.quran-uthmani`);
      const data = await res.json();
      if (!data?.data?.ayahs) throw new Error("No data");
      const { ayahs, name, englishName } = data.data;
      const grouped = groupIntoWajhs(ayahs, surahNum, name);
      setWajhs(grouped);
      // Generate tadabbur for first wajh
      await generateTadabbur(grouped[0], name, userName, userGender);
    } catch (err) {
      console.error("Failed to fetch surah:", err);
      setIsLoading(false);
      setIsAnimating(false);
    }
  };

  const generateTadabbur = async (wajh, surahName, name, gender) => {
    if (!wajh) return;
    const cacheKey = `${wajh.surahNum}-${wajh.wajhIdx}-${name}-${gender}`;
    if (tadabburCache.current[cacheKey]) {
      setTadabburData(tadabburCache.current[cacheKey]);
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 900);
      return;
    }

    setIsLoading(true);
    setIsAnimating(true);
    setTadabburData(null);

    try {
      const res = await fetch("/api/tadabbur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surahName: surahName || wajh.surahName,
          surahNum: wajh.surahNum,
          verseText: wajh.rawText || wajh.text,
          verseFrom: wajh.verseFrom,
          verseTo: wajh.verseTo,
          userName: name || "",
          userGender: gender || "male",
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        tadabburCache.current[cacheKey] = json.data;
        setTadabburData(json.data);
      }
    } catch (err) {
      console.error("Tadabbur error:", err);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 900);
    }
  };

  const handleSelectSurah = (surahNum) => {
    setSelectedSurahNum(surahNum);
    fetchAndLoadSurah(surahNum);
    setView("home");
  };

  const handlePrevWajh = () => {
    if (!wajhs || currentWajhIdx <= 0) return;
    const newIdx = currentWajhIdx - 1;
    setCurrentWajhIdx(newIdx);
    const wajh = wajhs[newIdx];
    if (wajh.preloaded) {
      const p = wajh.preloaded;
      setIsAnimating(true);
      setTadabburData({
        title: p.title,
        topics: p.thematicFlow?.map((t) => t.split("—")[0]?.trim()) || [],
        thematicFlow: p.thematicFlow || [],
        insights: p.insights || [],
        practical: p.practical || "",
        heartMessage: p.userMessage || "",
      });
      setTimeout(() => setIsAnimating(false), 800);
    } else {
      const surahInfo = wajhs[0];
      generateTadabbur(wajh, surahInfo?.surahName, userName, userGender);
    }
  };

  const handleNextWajh = () => {
    if (!wajhs || currentWajhIdx >= wajhs.length - 1) return;
    const newIdx = currentWajhIdx + 1;
    setCurrentWajhIdx(newIdx);
    const wajh = wajhs[newIdx];
    if (wajh.preloaded) {
      const p = wajh.preloaded;
      setIsAnimating(true);
      setTadabburData({
        title: p.title,
        topics: p.thematicFlow?.map((t) => t.split("—")[0]?.trim()) || [],
        thematicFlow: p.thematicFlow || [],
        insights: p.insights || [],
        practical: p.practical || "",
        heartMessage: p.userMessage || "",
      });
      setTimeout(() => setIsAnimating(false), 800);
    } else {
      const surahInfo = wajhs[0];
      generateTadabbur(wajh, surahInfo?.surahName, userName, userGender);
    }
  };

  // When user name or gender changes, regenerate for current wajh
  const handleUserNameChange = (name) => {
    setUserName(name);
    if (wajhs && wajhs[currentWajhIdx] && !wajhs[currentWajhIdx].preloaded) {
      generateTadabbur(wajhs[currentWajhIdx], wajhs[currentWajhIdx].surahName, name, userGender);
    }
  };

  const handleGenderChange = (gender) => {
    setUserGender(gender);
    if (wajhs && wajhs[currentWajhIdx] && !wajhs[currentWajhIdx].preloaded) {
      generateTadabbur(wajhs[currentWajhIdx], wajhs[currentWajhIdx].surahName, userName, gender);
    }
  };

  return (
    <>
      {!appReady && <LoadingScreen onDone={() => setAppReady(true)} />}
      <div
        dir="rtl"
        style={{
          minHeight: "100vh",
          background: "radial-gradient(ellipse at 50% 0%, #071a0c 0%, #040e07 45%, #020805 100%)",
          position: "relative",
          opacity: appReady ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <IslamicBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          {view === "home" && (
            <HomePage
              userName={userName}
              setUserName={handleUserNameChange}
              userGender={userGender}
              setUserGender={handleGenderChange}
              selectedSurahNum={selectedSurahNum}
              onSelectSurah={handleSelectSurah}
              wajhs={wajhs}
              currentWajhIdx={currentWajhIdx}
              onPrevWajh={handlePrevWajh}
              onNextWajh={handleNextWajh}
              tadabburData={tadabburData}
              isAnimating={isAnimating}
              isLoading={isLoading}
            />
          )}
          {view === "index" && (
            <QuranIndex
              onClose={() => setView("home")}
              onSelectSurah={handleSelectSurah}
              userName={userName}
            />
          )}
        </div>
      </div>
    </>
  );
}
