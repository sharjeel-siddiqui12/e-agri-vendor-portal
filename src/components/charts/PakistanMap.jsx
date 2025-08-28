"use client";

import React, { useState, useEffect, useRef } from "react";
import BasePakistanMap from "@react-map/pakistan";
import styles from "./PakistanMap.module.css";

const COLORS = {
  "very-high": "#2d4016",   // darkest green
  high: "#4a5d23",
  medium: "#6a7d43",
  low: "#9ab573",
  "no-activity": "#E6E6E6",
};

// 👉 Set your sales level per province here (adjust freely from your API/data)
const PROVINCE_LEVELS = {
  Punjab: "very-high",
  Sindh: "high",
  "Khyber Pakhtunkhwa": "medium", // (aka KPK)
  KPK: "medium",
  Balochistan: "low",
  "Gilgit-Baltistan": "low",
  GB: "low",
  "Azad Jammu and Kashmir": "low",
  AJK: "low",
  Islamabad: "low",
};

export default function PakistanMap() {
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const [mapSize, setMapSize] = useState(350);
  const wrapRef = useRef(null);

  // useEffect(() => {
  //   const updateMapSize = () => {
  //     if (typeof window !== "undefined") {
  //       const w = window.innerWidth;
  //       let newSize = 250;
  //       if (w < 640) newSize = Math.min(300, w * 0.9);
  //       else if (w < 1024) newSize = Math.min(350, w * 0.6);
  //       setMapSize(newSize);
  //     }
  //   };
  //   updateMapSize();
  //   window.addEventListener("resize", updateMapSize);
  //   return () => window.removeEventListener("resize", updateMapSize);
  // }, []);

  // Paint provinces after the SVG is in the DOM
  useEffect(() => {
    if (!wrapRef.current) return;

    const paint = () => {
      const root = wrapRef.current;

      // selectors to robustly find each province's path in the rendered SVG
      const provinceSelectors = {
        Punjab: [
          '[data-name="Punjab"]',
          '[title="Punjab"]',
          "#Punjab",
          "#punjab",
          'path[id*="punjab" i]',
        ],
        Sindh: [
          '[data-name="Sindh"]',
          '[title="Sindh"]',
          "#Sindh",
          "#sindh",
          'path[id*="sindh" i]',
        ],
        "Khyber Pakhtunkhwa": [
          '[data-name="Khyber Pakhtunkhwa"]',
          '[data-name="KPK"]',
          '[title="Khyber Pakhtunkhwa"]',
          "#KPK",
          "#kp",
          "#kpk",
          'path[id*="kpk" i]',
        ],
        Balochistan: [
          '[data-name="Balochistan"]',
          '[title="Balochistan"]',
          "#Balochistan",
          "#balochistan",
          'path[id*="balo" i]',
        ],
        "Gilgit-Baltistan": [
          '[data-name="Gilgit-Baltistan"]',
          '[data-name="Gilgit Baltistan"]',
          '[title="Gilgit-Baltistan"]',
          "#GB",
          "#gb",
          'path[id*="gilgit" i]',
        ],
        "Azad Jammu and Kashmir": [
          '[data-name="Azad Jammu and Kashmir"]',
          '[data-name="AJK"]',
          '[title="Azad Jammu and Kashmir"]',
          "#AJK",
          "#ajk",
          'path[id*="kashmir" i]',
        ],
        Islamabad: [
          '[data-name="Islamabad"]',
          '[title="Islamabad"]',
          "#Islamabad",
          "#islamabad",
          'path[id*="islamabad" i]',
        ],
      };

      const pick = (sels) => sels.map((s) => root.querySelector(s)).find(Boolean);

      Object.entries(provinceSelectors).forEach(([name, sels]) => {
        const el = pick(sels);
        if (!el) return;
        const level =
          PROVINCE_LEVELS[name] ??
          PROVINCE_LEVELS[name.replace(/\s+/g, " ")] ??
          "no-activity";
        el.style.fill = COLORS[level] || COLORS["no-activity"];
        el.style.transition = "fill 120ms ease-in-out";
        el.style.stroke = "#FFFFFF"; // white boundaries like your mock
        el.style.strokeWidth = 1;
      });
    };

    // paint now and also if the library re-renders the SVG
    paint();
    const obs = new MutationObserver(paint);
    obs.observe(wrapRef.current, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [mapSize]);

  return (
    <div className={styles.mapWrapper}>
      <div
        ref={wrapRef}
        style={{
          position: "relative",
          width: '150px',
          height: '200px',
          margin: "50px",
        }}
      >
        <BasePakistanMap
          type="select-single"
          size="250px"
          mapColor="#E6E6E6"     // base (unused for painted provinces)
          strokeColor="#D4D4D4"   // initial stroke; we overwrite to white per path
          strokeWidth={1}
          hoverColor="#D0D0D0"
          selectColor="#b5b5b5"
          onHover=""
          // onClick={(province) => {}}
        />
      </div>
    </div>
  );
}
