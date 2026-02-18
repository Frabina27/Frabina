import React from "react";
import Typewriter from "typewriter-effect";
import FrabinaPfp from "../images/FrabinaPfp.jpg";
import "../css/Home.css";


export default function Home() {
  return (
    <div className="home-wrapper">
      {/* === HERO SECTION === */}
      <section className="hero-section container">
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <h1 className="hero-title">
            Hello, I’m <span className="accent">Frabina</span>, <br />
            <span className="accent">
              <Typewriter
                options={{
                  strings: ["a UX/UI Designer", "a Programmer!", "a Student."],
                  autoStart: true,
                  loop: true,
                  delay: 100, 
                  deleteSpeed: 50,
                  pauseFor: 1500,
                }}
              />
            </span>
          </h1>

          <div className="hero-buttons">
            <a
              href="/resume.pdf"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download My Resume
          </a>
            <a href="/projects" className="btn">
              View Projects
            </a>
          </div>

          <p className="hero-description">
            I’m a passionate designer and developer who loves creating elegant,
            user-focused interfaces. My goal is to bridge creativity and
            technology to build meaningful, accessible experiences.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-right">
          <div className="floating-image">
            <img src={FrabinaPfp} alt="Frabina portrait" />
          </div>
        </div>
      </section>

      {/* === SKILLS SECTION === */}
      <section className="skills-section container">
        <div className="skill-card">
          <h3>Interests</h3>
          <p>Journaling, Gaming, Reading</p>
        </div>
        <div className="skill-card">
          <h3>Languages</h3>
          <p>Java, Python, HTML, CSS, JavaScript, LUA</p>
        </div>
        <div className="skill-card">
          <h3>Design Tools</h3>
          <p>Figma, Canva, Adobe</p>
        </div>
      </section>

      <div   style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  }}
>
{/* webring thing for utd acm */}
  <a href="https://cs.utdring.com/#https://frabina.com/?nav=prev">←</a>

  <a href="https://cs.utdring.com/#https://frabina.com/" target="_blank">
    <img
      src="https://cs.utdring.com/icon.white.svg"
      alt="CS Webring"
      style={{ width: '24px', height: 'auto', opacity: 0.8 }}
    />
  </a>

  <a href="https://cs.utdring.com/#https://frabina.com/?nav=next">→</a>
</div>


    </div>
  );
}
