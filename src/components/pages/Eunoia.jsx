import React from "react";
import "../../css/Designs.css";

import EunoiaImg from "../../images/Eunoia/EunoiaImg.png";
import EunoiaFT1IMG1 from "../../images/Eunoia/EunoiaFT1IMG1.png";
import EunoiaDashImg from "../../images/Eunoia/EunoiaDash.png";
import EunoiaFT2IMG1 from "../../images/Eunoia/EunoiaFT2IMG1.png";
import EunoiaFT3IMG1 from "../../images/Eunoia/EunoiaFT3IMG1.png";
import EunoiaFT4 from "../../images/Eunoia/EunoiaFT4.png";
import EunoiaFT4IMG1 from "../../images/Eunoia/EunoiaFT4IMG1.png";

export default function Eunoia() {
  const features = [
    {
      title: "Feature 1: Pomodoro Focus Timer",
      text:
        "Remote work often creates distractions and burnout. We designed a built-in Pomodoro timer to help users stay focused while encouraging healthy breaks throughout the day.",
      images: [EunoiaFT1IMG1],
    },
    {
      title: "Feature 2: Daily Tasks",
      text:
        "Users can complete wellness-based tasks such as drinking water, taking walks, stretching, or using the timer. Completing tasks earns coins and builds positive habits over time.",
      images: [EunoiaFT2IMG1],
    },
    {
      title: "Feature 3: Stats & Leaderboards",
      text:
        "We introduced a stats overview so users can track progress, compare achievements, and stay motivated through friendly competition.",
      images: [EunoiaFT3IMG1],
    },
    {
      title: "Feature 4: Character Customization",
      text:
        "Coins earned through wellness progress can be used to customize avatars with outfits, accessories, and collectibles—turning self-care into a rewarding game loop.",
      images: [EunoiaFT4, EunoiaFT4IMG1],
    },
  ];

  const process = [
    {
      title: "Empathize",
      text:
        "We researched common remote work struggles including burnout, low motivation, and lack of routine.",
    },
    {
      title: "Define",
      text:
        "We identified core needs: mood tracking, healthier routines, better time management, and motivation.",
    },
    {
      title: "Ideate",
      text:
        "We explored many concepts before choosing an 8-bit pixel world that made wellness feel playful and memorable.",
    },
    {
      title: "Prototype",
      text:
        "Interactive Figma prototypes were created to test flows, dashboards, rewards, and task systems.",
    },
    {
      title: "Test",
      text:
        "We gathered feedback and refined usability, readability, and balance between retro visuals and practical functionality.",
    },
  ];

  return (
    <div className="project-page container">
      {/* Hero */}
      <header className="project-hero">
        <p className="project-label">Hackathon / Product Design</p>

        <h1>Eunoia</h1>

        <p className="project-description">
          Eunoia reimagines workplace wellness through gamification. Inspired by
          CBRE’s human-centered values, our team designed a digital experience
          where mood check-ins, healthy habits, and team growth feel like
          leveling up in a pixel adventure game.
        </p>

        <div className="hero-buttons">
          <a
            href="/UXPERIENCE.pdf"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Pitch Deck
          </a>

          <a
            href="/Eunoia.mp4"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Demo
          </a>
        </div>

        <img
          src={EunoiaDashImg}
          alt="Eunoia dashboard"
          className="project-hero-image"
          style={{ maxWidth: "900px", width: "75%" }}
        />
      </header>

      {/* Overview */}
      <section className="project-section">
        <h2>Overview</h2>

        <p>
          Eunoia was created during a 24-hour design-a-thon with the goal of
          helping remote workers prioritize hydration, breaks, movement, and
          mental wellness. Instead of treating self-care like another task, we
          transformed it into an engaging experience.
        </p>
      </section>

      {/* Research */}
      <section className="project-section">
        <h2>Research Insights</h2>

        <p>
          We explored workplace wellness trends, burnout patterns, and
          motivation systems. Our biggest findings were that users respond well
          to visual progress, small rewards, and systems that make routines feel
          easier rather than overwhelming.
        </p>
      </section>

      {/* Competitive Analysis */}
      <section className="project-section">
        <h2>Competitive Analysis</h2>

        <p>
          Many wellness tools focused only on one area—task management,
          meditation, or exercise. We saw an opportunity to combine wellness,
          productivity, motivation, and personalization into one ecosystem.
        </p>

        <img
          src={EunoiaImg}
          alt="Eunoia concept overview"
          className="project-image"
        />
      </section>

      {/* Process */}
      <section className="project-section">
        <h2>Design Process</h2>

        <div className="process-steps">
          {process.map((step, index) => (
            <div className="step-card" key={index}>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="project-section">
        <h2>Core Features</h2>

        <div className="iteration-images">
          {features.map((feature, index) => (
            <div className="info-card" key={index}>
              <h3 style={{ marginBottom: "12px" }}>{feature.title}</h3>

              <p style={{ marginBottom: "18px" }}>{feature.text}</p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                  justifyContent: "center",
                }}
              >
                {feature.images.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img}
                    alt={feature.title}
                    className="project-image"
                    style={{
                      width: feature.images.length > 1 ? "45%" : "60%",
                      maxWidth: "700px",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reflection */}
      <section className="project-section">
        <h2>Takeaways</h2>

        <p>
          Eunoia showed how gamification can transform wellness into something
          people genuinely want to engage with. This project strengthened my
          skills in rapid ideation, team collaboration, user-centered thinking,
          and designing full product systems under tight deadlines.
        </p>
      </section>
    </div>
  );
}