import { useState } from "react";
import "./BellHeader.css";

export function BellHeader() {
  const [isLit, setIsLit] = useState(false);

  return (
    <div className="bell-header-wrapper">
      <div
        className={`bell-container ${!isLit ? "off" : ""}`}
        onClick={() => setIsLit(!isLit)}
      >
        <div className="rope"></div>
        <div className="bell-top"></div>

        <div className="bell-base"></div>
        <div className="bell-base"></div>
        <div className="shadow-l1"></div>
        <div className="shadow-l2"></div>
        <div className="left-glow"></div>
        <div className="left-glow2"></div>
        <div className="r-glow"></div>
        <div className="r-glow2"></div>
        <div className="mid-ring"></div>
        <div className="mid-ring small"></div>

        <div className="glow"></div>
        <div className="glow2"></div>

        <div className="bell-buff-t"></div>
        <div className="bell-buff"></div>

        <div className="bell-btm"></div>
        <div className="bell-btm2"></div>

        <div className="bell-ring-container">
          <div className="bell-ring"></div>
          <div className="bell-rays"></div>
        </div>

        <div className="volumetric">
          <div className="vl"></div>
          <div className="vr"></div>
        </div>
      </div>

      <div className={`company-info ${isLit ? "visible" : ""}`}>
        <h1 className="company-name">Unkommon</h1>
        <p className="company-tagline">
          Transform Your Business with Intelligent AI
        </p>
      </div>

      <div className="grain"></div>
    </div>
  );
}
