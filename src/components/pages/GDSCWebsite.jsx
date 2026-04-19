import React from "react";
import "../../css/Designs.css";

import GDSCImg from "../../images/GDSC/GDSCImg.png";
import GDSCevent from "../../images/GDSC/GDSCevent.png";
import GDSCpage from "../../images/GDSC/GDSCpage.png";
import GDSCWebsiteImg from "../../images/GDSC/GDSCWebsite.png";

export default function GDSCWebsite() {
  return (
    <div className="project-page container">
      {/* Hero */}
      <header className="project-hero">
        <p className="project-label">UI / UX Design</p>
        <h1>GDSC UTD Website</h1>

        <p className="project-description">
          I designed the official website for the Google Developer Student Club
          at UTD in Figma. The goal was to centralize club information,
          workshops, events, and resources into one modern, easy-to-navigate
          experience for students.
        </p>

        <img
          src={GDSCImg}
          alt="GDSC UTD homepage concept"
          className="project-hero-image"
        />
      </header>

      {/* Background */}
      <section className="project-section">
        <h2>Overview</h2>
        <p>
          GDSC UTD hosts workshops, hackathons, networking events, and technical
          sessions for students interested in software, design, and emerging
          technology. The website needed to reflect the club’s energy while also
          making it simple for students to quickly find information.
        </p>
      </section>

      {/* Problem */}
      <section className="project-section">
        <h2>The Challenge</h2>
        <p>
          Students often had to search across multiple platforms for updates,
          event details, and club resources. The challenge was creating one
          unified destination that felt professional, modern, and welcoming
          while keeping navigation intuitive.
        </p>
      </section>

      {/* Design Process */}
      <section className="project-section">
        <h2>Design Process</h2>
        <p>
          I began by identifying the key user flows: discovering events,
          learning about the organization, accessing resources, and joining the
          club. From there, I created high-fidelity mockups in Figma and tested
          multiple visual directions including dark blue, neutral, and
          multi-color variations inspired by Google branding.
        </p>

        <p>
          Through feedback from students and internal stakeholders, I refined
          the layouts to improve readability, spacing, and hierarchy while
          keeping the interface visually engaging.
        </p>
      </section>

      {/* Landing Page */}
      <section className="project-section">
        <h2>Landing Page</h2>

        <p>
          The landing page was designed to immediately communicate the club’s
          identity: collaborative, innovative, and student-focused. Bold
          typography, strong calls-to-action, and clean sectioning help users
          scan content quickly.
        </p>

        <img
          src={GDSCpage}
          alt="Landing page concept"
          className="project-image"
        />
      </section>

      {/* Events Section */}
      <section className="project-section">
        <h2>Events Experience</h2>

        <p>
          I designed event sections to clearly highlight upcoming workshops,
          featured initiatives, and past activities. This made it easier for
          students to stay involved and discover new opportunities.
        </p>

        <img
          src={GDSCevent}
          alt="Events section concept"
          className="project-image"
        />
      </section>

      {/* Final Iteration */}
      <section className="project-section">
        <h2>Final Iteration</h2>

        <p>
          After multiple rounds of iteration, the final version improved visual
          hierarchy, consistency, and readability while preserving the original
          energy of the design. It balanced strong branding with practical
          usability.
        </p>

        <img
          src={GDSCWebsiteImg}
          alt="Final website iteration"
          className="project-image"
        />
      </section>

      {/* Reflection */}
      <section className="project-section">
        <h2>Takeaways</h2>

        <p>
          This project strengthened my ability to design for organizations with
          active communities and evolving content needs. I learned how to create
          a scalable system that supports branding, usability, and growth all at
          once.
        </p>
      </section>
    </div>
  );
}