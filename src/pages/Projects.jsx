import React from "react";
import ProjectCard from "../components/ProjectCard";
import "../css/Designs.css";
import ProdigyImg from "../images/ProdigyImg.jpg";
import VoiceAssistantImg from "../images/VoiceAssistantImg.png";
import WeatherAppImg from "../images/WeatherAppImg.png";
import PomodoroImg from "../images/PomodoroIMG.png";
import GalagaImg from "../images/Galaga/GalagaCover.png";

export default function Projects() {
  const items = [
    { 
      title: "Prodigy - HACKUTD", 
      id: 5, 
      subtitle: "Platform for Project Managers.", 
      tags: ["Python", "ML"],
      image: ProdigyImg,
    },
    { 
      title: "Weather App", 
      id: 6, 
      subtitle: "Fetches live weather data.", 
      tags: ["React", "API"],
      image: WeatherAppImg,
    },
    { 
      title: "Voice Assistant", 
      id: 7, 
      subtitle: "Desktop AI assistant.", 
      tags: ["Python"],
      image: VoiceAssistantImg,
    },
    { 
      title: "Pomodoro", 
      id: 8, 
      subtitle: "Cute simple pomodoro timer.", 
      tags: ["Python"],
      image: PomodoroImg,
    },
    { 
      title: "Galaga", 
      id: 9, 
      subtitle: "Retro galactica remake", 
      tags: ["C++"],
      image: GalagaImg,
    },
  ];

  return (
    <div className="designs-page">
      <h1>Projects</h1>
      <p className="small">A showcase of my technical work!</p>
      <div className="grid">
        {items.map((it, i) => (
          <ProjectCard key={i} {...it} />
        ))}
      </div>
    </div>
  );
}
