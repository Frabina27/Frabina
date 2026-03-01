import React from "react";
import EunoiaImg from "../images/Eunoia/EunoiaImg.png";
import EunoiaFT1IMG1 from "../images/Eunoia/EunoiaFT1IMG1.png";
import EunoiaDashImg from "../images/Eunoia/EunoiaDash.png";
import EunoiaFT2IMG1 from "../images/Eunoia/EunoiaFT2IMG1.png";
import EunoiaFT3IMG1 from "../images/Eunoia/EunoiaFT3IMG1.png";
import EunoiaFT4 from "../images/Eunoia/EunoiaFT4.png";
import EunoiaFT4IMG1 from "../images/Eunoia/EunoiaFT4IMG1.png";

import "../css/Designs.css";

export default function Eunoia() {
  return (
    <div className="project-page container">

      {/* Project Title */}
      <h1>Eunoia - Wellness Platform</h1>

      {/* Project Description */}
      <p className="project-description">
        Eunoia reimagines workplace wellness in a fun and unique way!
        Inspired by CBRE’s human-centered approach, we designed a gamified digital environment where mood check-ins and team growth feel like leveling up in a pixel adventure game. 
        Our goal was to make workplace wellness interactive, accessible, and enjoyable.
      </p>
      <div className="hero-buttons">
        <a
          href="/UXPERIENCE.pdf"
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          View our Pitch!
        </a>
        <a
          href="/Eunoia.mp4"
          className="btn"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          Watch our recording!
        </a>
      </div>

      {/* Main Image */}
      <img
        src={EunoiaDashImg}
        alt="Eunoia dashboard main view"
        style={{ width: "75%", borderRadius: 12, margin: "20px 0"}}
      />

      {/* Project Details */}
      <section className="info-card">
        <h2>Background</h2>
        <p>
          Eunoia was designed during a 24-hour design-a-thon to combat remote worker burnout by prioritizing breaks, hydration, walks, and more! 
          The project aimed to transform personal wellness into an engaging experience that encourages self-reflection, collaboration, and consistent progress.
        </p>
      </section>

      <section className="info-card">
        <h2>Primary Research</h2>
        <p>
          We researched workplace wellness trends and human-centered design practices, focusing on ways to make wellness fun and engaging. 
          Key insights included the importance of mood tracking, visual feedback, and something to encourage regular participation.
        </p>
      </section>

      <section className="info-card">
        <h2>Competitive Analysis</h2>
        <p>
          We analyzed existing wellness apps and gamified productivity tools, noting that none of them provided the features we were looking for in one location.
          Eunoia’s design addressed these gaps with interactive dashboards, avatars, and level progression.
        </p>
      </section>

      <hr className="section-divider" />

      {/* Design Process Steps */}
      <section className="design-process">
        <h2>The Design Process</h2>
        <div className="process-steps">
          <div className="step-card">
            <h4>Empathize</h4>
            <p>We initially conducted research to identify common problems with remote work, such as lack of motivation and ease of burnout.</p>
          </div>
          <div className="step-card">
            <h4>Define</h4>
            <p>We identified user goals such as mood tracking, wellness, and time management as well as break management.</p>
          </div>
          <div className="step-card">
            <h4>Ideate</h4>
            <p>We brainstormed many designs for our product, but the 8-bit pixel theme stood out the most.</p>
          </div>
          <div className="step-card">
            <h4>Prototype</h4>
            <p>We created interactive Figma prototypes emphasizing 8-bit pixel aesthetics and smooth user flows.</p>
          </div>
          <div className="step-card">
            <h4>Test</h4>
            <p>We gathered feedback to refine usability, clarify the visual design, and balance retro 8-bit elements with modern workspace aesthetics.</p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Feature 1 */}
      <section className="iteration">
        <h2>Feature 1: Pomodoro</h2>
        <p>
          We realized how important time management is when working remotely. 
          We designed a Pomodoro timer to help users stay on track with their work while also reminding them to take breaks.
        </p>
        <div className="iteration-images">
          <img src={EunoiaFT1IMG1} alt="Pomodoro timer feature interface" style={{ width: "50%", margin: "12px 0" }} />
        </div>
      </section>

      {/* Feature 2 */}
      <section className="iteration">
        <h2>Feature 2: Daily Tasks</h2>
        <p>
          We designed Daily Tasks to help users build healthy habits and stay productive every day.
          From drinking enough water and taking a walk to using the Pomodoro timer, completing tasks earns coins and motivates users to keep up with their daily goals.
        </p>
        <div className="iteration-images">
          <img src={EunoiaFT2IMG1} alt="Daily Tasks feature showing coins earned from wellness activities" style={{ width: "50%", margin: "12px 0" }} />
        </div>
      </section>

      {/* Feature 3 */}
      <section className="iteration">
        <h2>Feature 3: Stats Overview</h2>
        <p>
          We created a Stats Overview so users can see how they stack up against others in the company.
          Track who’s completing their daily tasks, earn recognition, and get motivated by seeing your progress climb the leaderboard.
        </p>
        <div className="iteration-images">
          <img src={EunoiaFT3IMG1} alt="Stats overview showing user progress and leaderboard" style={{ width: "50%", margin: "12px 0" }} />
        </div>
      </section>

      {/* Feature 4 */}
      <section className="iteration">
        <h2>Feature 4: Character Customization</h2>
        <p>
          We built Character Customization so users can bring their avatars to life.
          Use the coins you earn from completing daily tasks to unlock outfits, accessories, and fun items! This makes the characters fully customizable while maintaining motivation to reach daily wellness goals.
        </p>
        <div className="iteration-images">
          <img src={EunoiaFT4} alt="Character customization interface showing avatar options" style={{ width: "45%", margin: "12px 0", marginRight: "4%" }} />
          <img src={EunoiaFT4IMG1} alt="Character customization interface with outfits and accessories" style={{ width: "45%", margin: "12px 0" }} />
        </div>
      </section>

      {/* Inspiration & Accomplishments */}
      <section className="info-card">
        <h2>Inspiration & Accomplishments</h2>
        <p>
          Inspired by CBRE’s human-centered design approach, we built a gamified wellness platform that makes work fun. 
          We are proud of designing Eunoia from the ground up, creating a full 8-bit inspired interface through collaboration, creativity, and persistence.
        </p>
      </section>

    {/* Summary / Conclusion */}
    <section className="info-card">
      <h2>Conclusion</h2>
      <p>
        Eunoia demonstrates how gamification can transform wellness into an engaging and motivating experience. 
        By combining thorough research, thoughtful design, and iterative prototyping, we created a platform that balances creativity with usability. 
        Throughout the project, collaboration and persistence were key, allowing us to build a full-featured, user-centered wellness platform in a short timeframe. 
        This project reinforced the importance of user feedback, innovative problem-solving, and designing experiences that truly resonate with people.
      </p>
    </section>

    </div>
  );
}
