import React, { useState } from "react";
import { Link } from "react-router-dom";

import ProdigyImg from "../images/ProdigyImg.jpg";
import VoiceAssistantImg from "../images/VoiceAssistantImg.png";
import WeatherAppImg from "../images/WeatherAppImg.png";
import PomodoroImg from "../images/PomodoroIMG.png";
import EunoiaImg from "../images/Eunoia/EunoiaImg.png";
import MeteorMateImg from "../images/MM/MeteorMate.png";
import GDSCImg from "../images/GDSC/GDSCImg.png";
import ACM_Page3 from "../images/ACMno/ACM_Page3.png";
import ValorantImg from "../images/Val/Val1.png";

const ALL_ITEMS = [
  {
    id: 5,
    type: "dev",
    title: "Prodigy",
    subtitle: "All-in-one project management platform.",
    description:
      "Built at HackUTD — a unified workspace replacing Discord, Slack, and Calendar for student teams.",
    tags: ["Python", "React", "Flask", "Axios"],
    image: ProdigyImg,
  },
  {
    id: 6,
    type: "dev",
    title: "Weather App",
    subtitle: "Live weather data at a glance.",
    description:
      "Fetches real-time weather via a public API and displays forecasts with a clean, minimal UI.",
    tags: ["React", "API", "CSS"],
    image: WeatherAppImg,
  },
  {
    id: 7,
    type: "dev",
    title: "Voice Assistant",
    subtitle: "Desktop AI assistant.",
    description:
      "Python-based voice assistant integrating speech recognition, text-to-speech, and task automation.",
    tags: ["Python", "SpeechRecognition", "pyttsx3"],
    image: VoiceAssistantImg,
  },
  {
    id: 8,
    type: "dev",
    title: "Pomodoro Timer",
    subtitle: "Cute, simple focus timer.",
    description:
      "A minimal pomodoro timer with customizable intervals and a soft, friendly interface.",
    tags: ["Python"],
    image: PomodoroImg,
  },
  {
    id: 9,
    type: "dev",
    title: "Galaga",
    subtitle: "Retro arcade remake.",
    description:
      "A from-scratch C++ remake of the classic Galaga arcade game with custom sprite rendering.",
    tags: ["C++"],
    image: EunoiaImg,
  },
  {
    id: 1,
    type: "design",
    title: "Eunoia",
    subtitle: "Gamified wellness platform.",
    description:
      "Full UI/UX design for a wellness app built during a 24-hour design-a-thon. Focused on accessibility and engagement.",
    tags: ["UI/UX", "Figma"],
    image: EunoiaImg,
    link: "/projects/eunoia",
  },
  {
    id: 2,
    type: "design",
    title: "MeteorMate",
    subtitle: "Roommate matching platform.",
    description:
      "End-to-end Figma designs for a UTD student roommate finder — wireframes, hi-fi prototypes, and design system.",
    tags: ["UI/UX", "Figma"],
    image: MeteorMateImg,
    link: "/projects/meteormate",
  },
  {
    id: 3,
    type: "design",
    title: "ACM Archives",
    subtitle: "Student magazine.",
    description:
      "Designed a multi-page editorial magazine layout for ACM UTD's community publication using Canva.",
    tags: ["Branding", "Canva", "Graphic Design"],
    image: ACM_Page3,
    link: "/projects/acmarchives",
  },
  {
    id: 4,
    type: "design",
    title: "GDSC UTD Website",
    subtitle: "Official club website.",
    description:
      "Designed the full website for Google Developer Student Club at UTD — branding, layout, and component library.",
    tags: ["Branding", "UI/UX", "Figma"],
    image: GDSCImg,
    link: "/projects/gdsc",
  },
  {
    id: 10,
    type: "design",
    title: "Valorant Cards",
    subtitle: "Fan-made player cards.",
    description:
      "Designed a series of stylised player cards inspired by Valorant's visual identity, for fun.",
    tags: ["Personal", "UI/UX", "Figma"],
    image: ValorantImg,
    link: "/projects/valorant",
  },
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Dev", value: "dev" },
  { label: "Design", value: "design" },
];

const BADGE_STYLE = {
  dev: { background: "#1e3a5f", color: "#7eb8f7" },
  design: { background: "#514b6e", color: "#c9bff7" },
};

function WorkCard({ item }) {
  const cardContent = (
    <>
      <div className="work-card-header">
        <img src={item.image} alt={item.title} className="work-card-icon" />

        <div className="work-card-titles">
          <p className="work-card-title">{item.title}</p>
          <p className="work-card-subtitle">{item.subtitle}</p>
        </div>

        <span className="work-card-badge" style={BADGE_STYLE[item.type]}>
          {item.type === "dev" ? "Dev" : "Design"}
        </span>
      </div>

      <p className="work-card-description">{item.description}</p>

      <div className="work-card-tags">
        {item.tags.map((tag, i) => (
          <span key={i} className="work-card-tag">
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  return item.link ? (
    <Link to={item.link} className="work-card">
      {cardContent}
    </Link>
  ) : (
    <div className="work-card">{cardContent}</div>
  );
}

export default function WorkSection() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? ALL_ITEMS
      : ALL_ITEMS.filter((item) => item.type === active);

  return (
    <section id="projects" className="work-section">
      <div className="work-section-header">
        <h1>Projects</h1>
        <p className="small">Projects & designs - all in one place!</p>
      </div>

      <div className="work-filters">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`work-filter-pill ${active === f.value ? "active" : ""}`}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="work-grid">
        {filtered.map((item) => (
          <WorkCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}