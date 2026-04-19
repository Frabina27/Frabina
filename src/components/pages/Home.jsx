import React from "react";
import Typewriter from "typewriter-effect";
import FrabinaPfp from "../../images/FrabinaPfp.jpg";
import Resume from "../Resume";
import WorkSection from "../WorkSection";
import "../../css/WorkSection.css";
export default function Home() {
  const quotes = [
    { text: "Be The Change You Wish To See In The World", author: "— Mahatma Gandhi" },
    { text: "I am going to make everything around me beautiful - that will be my life.", author: "— Elsie de Wolfe" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "— Eleanor Roosevelt" },
  ];

  const [quoteIndex, setQuoteIndex] = React.useState(0);
  const [fading, setFading] = React.useState(false);

  const changeQuote = (dir) => {
    setFading(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + dir + quotes.length) % quotes.length);
      setFading(false);
    }, 250);
  };

  return (
    <div className="home-wrapper">

      {/* ===== HERO SECTION ===== */}
      <section id="home" className="hero-section container">
        <div className="hero-left">
          <h1 className="hero-title">
            Hello, I'm <span className="accent">Frabina</span>, <br />
            <span className="accent">
              <Typewriter
                options={{
                  strings: ["a Developer", "a Designer", "an Educator"],
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
            <a href="/resume.pdf" className="btn" target="_blank" rel="noopener noreferrer" download>
              Download My Resume
            </a>
            <a href="#projects" className="btn">View Projects</a>
          </div>

          <p className="hero-description">
            I'm a passionate designer and developer who loves creating elegant,
            user-focused interfaces. My goal is to bridge creativity and
            technology to build meaningful, accessible experiences.
          </p>
        </div>

        <div className="hero-right">
          <div className="floating-image">
            <img src={FrabinaPfp} alt="Frabina portrait" />
          </div>
        </div>
      </section>

      {/* ===== SKILLS CARDS ===== */}
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

      {/* ===== QUOTE CAROUSEL ===== */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", marginTop: "20px", marginBottom: "40px" }}>
        <div className="quote-bar container">
          <button className="quote-arrow" onClick={() => changeQuote(-1)}>‹</button>
          <div className={`quote-content ${fading ? "quote-fade-out" : "quote-fade-in"}`}>
            <p className="quote-text">"{quotes[quoteIndex].text}"</p>
            <span className="quote-author">{quotes[quoteIndex].author}</span>
          </div>
          <button className="quote-arrow" onClick={() => changeQuote(1)}>›</button>
        </div>
      </div>

      {/* ===== EXPERIENCE SECTION ===== */}
      <Resume />

      {/* ===== WORK SECTION (Projects + Designs) ===== */}
      <WorkSection />


      <footer className="footer">
        <p className="footer-name">♡ Frabina Edwin</p>
        <p className="footer-copy">© 2026 All rights reserved</p>
        <a href="https://frabina.com" target="_blank" rel="noopener noreferrer" className="footer-link">
          frabina.com
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px" }}>
          <a href="https://cs.utdring.com/#https://frabina.com/?nav=prev" style={{ color: "white", textDecoration: "none", opacity: 0.7, fontSize: "14px" }}>←</a>
          <a href="https://cs.utdring.com/#https://frabina.com/" target="_blank" rel="noopener noreferrer">
            <img src="https://cs.utdring.com/icon.white.svg" alt="CS Webring" style={{ width: "30px", height: "auto", opacity: 0.7, display: "block" }} />
          </a>
          <a href="https://cs.utdring.com/#https://frabina.com/?nav=next" style={{ color: "white", textDecoration: "none", opacity: 0.7, fontSize: "14px" }}>→</a>
        </div>
      </footer>

    </div>
  );
}