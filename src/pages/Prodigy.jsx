import React from "react";
import "../css/Designs.css"; // Shared styling
import ProdigyImg from "../images/ProdigyImg.jpg"; // Replace with your actual image

export default function Prodigy() {
  const techStack = [
    "React.js",
    "Vite",
    "Flask",
    "Axios",
    "CSS",
    "HTML",
    "JSX",
    "Python",
    "GitHub",
  ];

  return (
    <div className="project-page container">
      {/* Project Title */}
      <h1>Prodigy - All-in-One Project Management Platform</h1>

      {/* Description */}
      <p className="project-description">
        Prodigy was built to simplify project management for teams that juggle multiple collaboration tools. 
        Instead of switching between Discord, Google Calendar, Slack, and Zoom, Prodigy provides one centralized space 
        for managing tasks, tracking progress, and staying connected all in one intuitive interface.
      </p>

      {/* Main Image */}
      <img
        src={ProdigyImg}
        alt="Prodigy Project Overview"
        style={{ width: "100%", borderRadius: 12, margin: "20px 0" }}
      />

      {/* Inspiration */}
      <section className="project-section">
        <h2>Inspiration</h2>
        <p>
          Being a project manager is so difficult especially when every platform serves a different purpose. 
          As students managing multiple group projects, we realized that most tools were fragmented and lacked 
          integration. Our goal with Prodigy was to create a unified platform that keeps teams organized, 
          tracks tasks in real-time, and streamlines productivity.
        </p>
      </section>

      {/* What It Does */}
      <section className="project-section">
        <h2>What It Does</h2>
        <div className="info-card">
          <p>
            Prodigy makes project management effortless by providing real-time updates on tasks, progress, 
            and deadlines across a shared workspace. Team members can stay aligned, view project timelines, 
            and monitor completion metrics in one place helping everyone stay on track without needing multiple apps.
          </p>
        </div>
      </section>

       {/* How We Built It */}
      <section className="project-section">
        <h2>How We Built It</h2>
        <div className="info-card">
          <p>
            • React.js for a dynamic, responsive front-end<br />
            • Vite for a fast development environment<br />
            • Flask for lightweight backend APIs<br />
            • Axios to handle communication between front-end and backend<br />
            • Custom CSS for a clean, intuitive interface
          </p>
        </div>
      </section>

      {/* Challenges */}
      <section className="project-section">
        <h2>Challenges We Ran Into</h2>
        <div className="info-card">
          <p>
            Balancing all the features we wanted such as live updates, AI integration, 
            and a clean UI while keeping the experience intuitive was more difficult than we imagined. Backend implementation and integrating AI were particularly challenging.
          </p>
        </div>
      </section>

      {/* Tech Stack as Pills */}
      <section className="project-section">
        <h2>Built With</h2>
        <div className="tech-pills">
          {techStack.map((tech, i) => (
            <span key={i} className="tech-pill">{tech}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
