// src/views/Home/Home.jsx
import React from "react";
import Avatar from "../Home/Avatar/Avatar.jsx";
import About from "../Home/About/About.jsx";
import StatusCard from "../Home/StatusCard/StatusCard.jsx";
import useScaleToFit from "../../js/useScaleToFit.js";
import "./Home.css";

export default function Home() {
  // Refs for scaling
  const outerRef = React.useRef(null);
  const innerRef = React.useRef(null);
  useScaleToFit(outerRef, innerRef, { minScale: 0.62 });

  return (
    <section
      id="panel-home"
      className="view panel fit-outer"
      role="tabpanel"
      aria-labelledby="tab-home"
      ref={outerRef}
    >
      <div className="fit-inner" ref={innerRef}>
        <div className="home-split">
          {/* Left column */}
          <header className="intro">
            <h1 className="title">
              Hi, I’m <span className="accent">Tom</span>.
            </h1>
            <p className="subtitle">
              Full-stack developer crafting robust backends and fast, accessible
              UIs.
            </p>

            <About
              id="about-work"
              title="About — Work"
              intro="Backend-leaning full-stack dev who ships fast and clean."
              chips={[
                "Years coding: 3+",
                "Core stack: Java • Spring • Postgres",
                "Also: React • REST • AWS",
              ]}
              items={[
                "Very consistent, determined, and disciplined.",
                "Built secure auth flows (Cognito/OIDC/JWT).",
                "Integrated external APIs (news, Reddit, payments).",
                "Wrote tests (JUnit) and docs; automated Postman collections.",
              ]}
            />

            <About
              id="about-home"
              title="About — Home"
              intro="Builder, tinkerer, and life-long learner."
              chips={[
                "Hobbies: Cars, Gym, Travel",
                "Learning: Virtues + Patience",
                "Value: Consistency > Intensity",
              ]}
              items={[
                "Weekend: Outdoor activities that keep me grounded.",
                "I like keeping things organized and measurable.",
                "Always up for a new challenge or adventure.",
                "I try to embody stoicism to the best of my abilities.",
              ]}
            />
          </header>

          {/* Right column: avatar + status stacked */}
          <div className="right-col">
            <Avatar
              src="/images/2025-cropped-selfie.png"
              alt="Portrait of Tom"
            />
            <StatusCard text="Open to roles" />
          </div>
        </div>
      </div>
    </section>
  );
}
