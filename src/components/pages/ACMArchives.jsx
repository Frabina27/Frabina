import React from "react";
import "../../css/Designs.css";

import Page1 from "../../images/ACMno/ACM_Page1.png";
import Page2 from "../../images/ACMno/ACM_Page2.png";
import Page3 from "../../images/ACMno/ACM_Page3.png";
import Page4 from "../../images/ACMno/ACM_Page4.png";
import Page5 from "../../images/ACMno/ACM_Page5.png";

import ACMno1 from "../../images/ACMno/ACMno1.png";
import ACMno2 from "../../images/ACMno/ACMno2.png";
import ACMno3 from "../../images/ACMno/ACMno3.png";
import ACMno4 from "../../images/ACMno/ACMno4.png";
import ACMno5 from "../../images/ACMno/ACMno5.png";
import ACMno6 from "../../images/ACMno/ACMno6.png";
import ACMno7 from "../../images/ACMno/ACMno7.png";
import ACMno8 from "../../images/ACMno/ACMno8.png";
import ACMno9 from "../../images/ACMno/ACMno9.png";
import ACMno10 from "../../images/ACMno/ACMno10.png";
import ACMno11 from "../../images/ACMno/ACMno11.png";
import ACMno12 from "../../images/ACMno/ACMno12.png";
import ACMno13 from "../../images/ACMno/ACMno13.png";
import ACMno14 from "../../images/ACMno/ACMno14.png";

const featuredPages = [
  {
    title: "October Page",
    description:
      "The October page highlights ACM’s biggest events of the month through a clean, technical layout inspired by retro pop-up windows. Each event is framed with pixel-style details, ACM branding, and tech-inspired graphics that balance structure with personality.",
    images: [Page1],
  },
  {
    title: "November Page",
    description:
      "For the November page, I leaned into a Y2K-inspired visual direction with metallic details, a CD graphic, and playful references to classic desktop interfaces. The result feels nostalgic, techy, and energetic while still presenting ACM’s events clearly.",
    images: [Page2],
  },
  {
    title: "ACM Archives",
    description:
      "This page was designed to spotlight the magazine team through a yearbook-inspired concept with a modern twist. Candid imagery, expressive typography, and playful layout choices help the page feel personal while still polished.",
    images: [Page3],
  },
  {
    title: "Mentors & Tech Prep Team",
    description:
      "This spread highlights the people behind ACM’s events—the mentors, organizers, and team members who make each initiative possible. I used green accents to reinforce ACM’s branding and polaroid-style frames to give the layout a more human, approachable feel.",
    images: [Page4, Page5],
  },
];

const extraDesigns = [
  ACMno1,
  ACMno2,
  ACMno3,
  ACMno4,
  ACMno5,
  ACMno6,
  ACMno7,
  ACMno8,
  ACMno9,
  ACMno10,
  ACMno11,
  ACMno12,
  ACMno13,
  ACMno14,
];

export default function ACMArchives() {
  return (
    <div className="project-page container">
      <header className="project-hero">
        <p className="project-label">Editorial Design</p>
        <h1>ACM Archives</h1>
        <p className="project-description">
          A collection of magazine layouts created for ACM’s student publication.
          This project focused on combining strong visual storytelling with
          clear information hierarchy, while exploring playful digital, retro,
          and editorial-inspired aesthetics.
        </p>
      </header>

      <section className="project-section">
        <h2>Featured Pages</h2>

        <div className="iteration-images">
          {featuredPages.map((page, index) => (
            <div className="info-card" key={index}>
              <p>
                <strong>{page.title}:</strong> {page.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                  marginTop: "16px",
                }}
              >
                {page.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${page.title} ${imgIndex + 1}`}
                    style={{
                      width: page.images.length > 1 ? "48%" : "60%",
                      borderRadius: "14px",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="project-section">
        <h2>Early Explorations</h2>
        <p className="project-description">
          These are concept directions and extra layouts created during the
          early iteration phase. Some were experimental, some were just for fun,
          and all of them helped shape the final visual direction of the project.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          {extraDesigns.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`ACM exploration ${index + 1}`}
              style={{
                width: "100%",
                borderRadius: "14px",
                display: "block",
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}