import React from "react";
import "../../css/Designs.css";

import Val1 from "../../images/Val/Val1.png";
import Val2 from "../../images/Val/Val2.png";
import Val3 from "../../images/Val/Val3.png";
import Val5 from "../../images/Val/Val5.png";

export default function ValorantCards() {
  const cards = [
    {
      image: Val1,
      title: "Killjoy",
      alt: "Valorant Killjoy custom player card",
      description:
        "A playful but tactical design inspired by Killjoy’s inventive personality. Bright accents, clean spacing, and technical details were used to reflect her engineer identity.",
    },
    {
      image: Val2,
      title: "Chamber",
      alt: "Valorant Chamber custom player card",
      description:
        "A sleek and premium concept focused on elegance and precision. Sharp layout choices and minimal styling mirror Chamber’s refined personality.",
    },
    {
      image: Val3,
      title: "Neon",
      alt: "Valorant Neon custom player card",
      description:
        "Designed with speed and energy in mind. Strong contrast, electric visuals, and bold motion-inspired elements capture Neon’s fast-paced playstyle.",
    },
    {
      image: Val5,
      title: "Cypher",
      alt: "Valorant Cypher custom player card",
      description:
        "A mysterious concept built around surveillance and strategy. Structured framing and subtle details help communicate Cypher’s calculated presence.",
    },
  ];

  return (
    <div className="project-page container">
      {/* Hero */}
      <header className="project-hero">
        <p className="project-label">Personal Design Project</p>
        <h1>Valorant Player Cards</h1>

        <p className="project-description">
          This was a personal UI/UX project created for fun and skill-building.
          I redesigned collectible-style player cards inspired by characters
          from Valorant, focusing on visual identity, hierarchy, and character
          storytelling through interface design.
        </p>
      </header>

      {/* Overview */}
      <section className="project-section">
        <h2>Project Goal</h2>
        <p>
          The goal was to create visually engaging player cards that felt true
          to each character while presenting information in a clean, polished,
          game-ready format. Each design explores typography, composition, and
          branding through a unique lens.
        </p>
      </section>

      {/* Cards */}
      <section className="project-section">
        <h2>Character Concepts</h2>

        <div className="iteration-images">
          {cards.map((card, index) => (
            <div className="info-card" key={index}>
              <h3 style={{ marginBottom: "10px" }}>{card.title}</h3>

              <p style={{ marginBottom: "18px" }}>{card.description}</p>

              <img
                src={card.image}
                alt={card.alt}
                className="project-image"
                style={{
                  width: "70%",
                  maxWidth: "700px",
                  borderRadius: "14px",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Reflection */}
      <section className="project-section">
        <h2>Takeaways</h2>

        <p>
          This project helped strengthen my visual design skills through a more
          creative lens. It gave me room to experiment with branding systems,
          layout rhythm, color storytelling, and how interface design can
          communicate personality.
        </p>
      </section>
    </div>
  );
}