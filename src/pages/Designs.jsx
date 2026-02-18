import React from "react";
import ProjectCard from "../components/ProjectCard";
import EunoiaImg from "../images/Eunoia/EunoiaImg.png";
import MeteorMateImg from "../images/MM/MeteorMate.png";
import GDSCImg from "../images/GDSC/GDSCImg.png";
import ACM_Page3 from "../images/ACMno/ACM_Page3.png";
import ValorantImg from "../images/Val/Val1.png";
import "../css/Designs.css";

export const items = [
  {
    title: "Eunoia - Wellness Platform",
    id: 1,
    subtitle: "Designed a gamified wellness platform during a 24hr design-a-thon.",
    tags: [ "UI/UX","Figma"],
    image: EunoiaImg,
  },
  {
    title: "MeteorMate - Roommate Finder",
    id: 2,
    subtitle: "Designs for a student roommate matching platform.",
    tags: ["UI/UX", "Figma"],
    image: MeteorMateImg,
  },
  {
    title: "ACM Archives - Magazine",
    id: 3,
    subtitle: "Designed pages in a magazine using Canva.",
    tags: ["Branding", "Canva", "Graphic Design"],
    image: ACM_Page3,
  },
  {
    title: "GDSC UTD - Club Website",
    id: 4,
    subtitle: "Designed the official website for the Google Developer Student Club.",
    tags: ["Branding", "UI/UX", "Figma"],
    image: GDSCImg,
  },
  {
    title: "Valorant",
    id: 10,
    subtitle: "Designed fun and engaging player cards from a popular video game",
    tags: ["Personal", "UI/UX", "Figma"],
    image: ValorantImg,
  },
];

export default function Designs() {
  return (
    <div className="designs-page">
      <h1>Designs</h1>
      <p className="small">Crafting digital experiences one design at a time!</p>

      <div className="grid">
        {items.map((it, i) => (
          <ProjectCard key={i} {...it} />
        ))}
      </div>
    </div>
  );
}
