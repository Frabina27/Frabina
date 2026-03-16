import React, { useState } from "react";
import { Link } from "react-router-dom";

import ProdigyImg        from "../images/ProdigyImg.jpg";
import VoiceAssistantImg from "../images/VoiceAssistantImg.png";
import WeatherAppImg     from "../images/WeatherAppImg.png";
import PomodoroImg       from "../images/PomodoroIMG.png";
import GalagaImg         from "../images/Galaga/GalagaCover.png";
import EunoiaImg         from "../images/Eunoia/EunoiaImg.png";
import MeteorMateImg     from "../images/MM/MeteorMate.png";
import GDSCImg           from "../images/GDSC/GDSCImg.png";
import ACM_Page3         from "../images/ACMno/ACM_Page3.png";
import ValorantImg       from "../images/Val/Val1.png";

const ALL_ITEMS = [
  {
    id: 5,
    type: "dev",
    title: "Prodigy",
    subtitle: "All-in-one project management platform.",
    description: "Built at HackUTD — a unified workspace replacing Discord, Slack, and Calendar for student teams.",
    tags: ["Python", "React", "Flask", "Axios"],
    image: ProdigyImg,
    link: "/projects/5",
  },
  {
    id: 6,
    type: "dev",
    title: "Weather App",
    subtitle: "Live weather data at a glance.",
    description: "Fetches real-time weather via a public API and displays forecasts with a clean, minimal UI.",
    tags: ["React", "API", "CSS"],
    image: WeatherAppImg,
    link: "/projects/6",
  },
  {
    id: 7,
    type: "dev",
    title: "Voice Assistant",
    subtitle: "Desktop AI assistant.",
    description: "Python-based voice assistant integrating speech recognition, text-to-speech, and task automation.",
    tags: ["Python", "SpeechRecognition", "pyttsx3"],
    image: VoiceAssistantImg,
    link: "/projects/7",
  },
  {
    id: 8,
    type: "dev",
    title: "Pomodoro Timer",
    subtitle: "Cute, simple focus timer.",
    description: "A minimal pomodoro timer with customizable intervals and a soft, friendly interface.",
    tags: ["Python"],
    image: PomodoroImg,
    link: "/projects/8",
  },
  {
    id: 9,
    type: "dev",
    title: "Galaga",
    subtitle: "Retro arcade remake.",
    description: "A from-scratch C++ remake of the classic Galaga arcade game with custom sprite rendering.",
    tags: ["C++"],
    image: GalagaImg,
    link: "/projects/9",
  },
  {
    id: 1,
    type: "design",
    title: "Eunoia",
    subtitle: "Gamified wellness platform.",
    description: "Full UI/UX design for a wellness app built during a 24-hour design-a-thon. Focused on accessibility and engagement.",
    tags: ["UI/UX", "Figma"],
    image: EunoiaImg,
    link: "/designs/1",
  },
  {
    id: 2,
    type: "design",
    title: "MeteorMate",
    subtitle: "Roommate matching platform.",
    description: "End-to-end Figma designs for a UTD student roommate finder — wireframes, hi-fi prototypes, and design system.",
    tags: ["UI/UX", "Figma"],
    image: MeteorMateImg,
    link: "/designs/2",
  },
  {
    id: 3,
    type: "design",
    title: "ACM Archives",
    subtitle: "Student magazine.",
    description: "Designed a multi-page editorial magazine layout for ACM UTD's community publication using Canva.",
    tags: ["Branding", "Canva", "Graphic Design"],
    image: ACM_Page3,
    link: "/designs/3",
  },
  {
    id: 4,
    type: "design",
    title: "GDSC UTD Website",
    subtitle: "Official club website.",
    description: "Designed the full website for Google Developer Student Club at UTD — branding, layout, and component library.",
    tags: ["Branding", "UI/UX", "Figma"],
    image: GDSCImg,
    link: "/designs/4",
  },
  {
    id: 10,
    type: "design",
    title: "Valorant Cards",
    subtitle: "Fan-made player cards.",
    description: "Designed a series of stylised player cards inspired by Valorant's visual identity, for fun.",
    tags: ["Personal", "UI/UX", "Figma"],
    image: ValorantImg,
    link: "/designs/10",
  },
];

const FILTERS = [
  { label: "All",    value: "all"    },
  { label: "Dev",    value: "dev"    },
  { label: "Design", value: "design" },
];

// Badge colors
const BADGE_STYLE = {
  dev:    { background: "#1e3a5f", color: "#7eb8f7" },
  design: { background: "#514b6e", color: "#c9bff7" },
};

// Single card
function WorkCard({ item }) {
  return (
    <Link to={item.link} className="work-card">
      {/* Header */}
      <div className="work-card-header">
        <img src={item.image} alt={item.title} className="work-card-icon" />
        <div className="work-card-titles">
          <p className="work-card-title">{item.title}</p>
          <p className="work-card-subtitle">{item.subtitle}</p>
        </div>
        <span
          className="work-card-badge"
          style={BADGE_STYLE[item.type]}
        >
          {item.type === "dev" ? "Dev" : "Design"}
        </span>
      </div>

      {/* Description */}
      <p className="work-card-description">{item.description}</p>

      {/* Tags */}
      <div className="work-card-tags">
        {item.tags.map((tag, i) => (
          <span key={i} className="work-card-tag">{tag}</span>
        ))}
      </div>
    </Link>
  );
}

// ── Main section
export default function WorkSection() {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? ALL_ITEMS
    : ALL_ITEMS.filter((item) => item.type === active);

  return (
    <section id="projects" className="work-section">
      {/* Heading */}
      <div className="work-section-header">
        <h1>Projects</h1>
        <p className="small">Projects & designs - all in one place!</p>
      </div>

      {/* Filter pills */}
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

      {/* Grid */}
      <div className="work-grid">
        {filtered.map((item) => (
          <WorkCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}