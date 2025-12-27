import React from "react";
import MeteorMateImg from "../images/MM/MeteorMate.png";
import MMCreateAccount from "../images/MM/MMCreateAccount.png";
import MMPreferences from "../images/MM/MMPreferences.png";
import MMProfile from "../images/MM/MMProfile.png";
import MMScreen from "../images/MM/MMScreen.png";
import MMQuestion from "../images/MM/MMQuestion.png";

import MMScreenWhite from "../images/MM/MMScreenWhite.png";
import MMQuestionWhite from "../images/MM/MMQuestionWhite.png";
import MMPersonalityWhite from "../images/MM/MMPersonalityWhite.png";
import MMCreateAccountWhite from "../images/MM/MMCreateAccountWhite.png";

import "../css/Designs.css";

export default function MeteorMate() {
  return (
    <div className="project-page container">

      {/* Project Title */}
      <h1>ACM Development - MeteorMate (Work In Progress) </h1>

      {/* Project Description */}
      <p className="project-description">
        I designed the UI/UX for MeteorMate, a student-focused roommate matching platform. 
        MeteorMate helps students find compatible roommates through a simple and engaging interface.
      </p>

      {/* Main Image */}
      <img
        src={MeteorMateImg}
        alt="MeteorMate homepage interface showing main dashboard"
        style={{ width: "100%", borderRadius: 12, margin: "20px 0" }}
      />

      {/* Background */}
      <section className="project-section">
        <h2>Background</h2>
        <p>
          Students often struggle to find roommates with compatible lifestyles and preferences. 
          MeteorMate was created to simplify this process, helping students connect with suitable roommates quickly and confidently. 
          The existing system was inefficient and stressful, so we aimed to build a better solution.
        </p>
      </section>

      {/* User Needs & Research */}
      <section className="project-section">
        <h2>User Needs & Research</h2>
        <p>
          We spoke with students and conducted surveys to understand their challenges. 
          The main needs were compatibility in lifestyle, clear information, and ease of communication. 
          Students wanted an interface that was simple, engaging, and helped them find roommates they would feel comfortable living with.
        </p>
      </section>

      {/* Main Features */}
      <section className="project-section">
        <h2>Main Features</h2>
        <p>
          The platform allows users to create profiles with personal information and preferences, answer a set of compatibility questions, and search or filter potential roommates by dorm, major, habits, and interests. 
          These features guide students step by step to find compatible matches efficiently.
        </p>
      </section>

      {/* Design Process */}
      <section className="project-section">
        <h2>Design Process</h2>
        <p>
          I followed a standard design process. First, I empathized with students to understand roommate challenges. 
          Then I defined key pain points like compatibility, clarity, and communication. 
          Next, I ideated features such as matching questions, filters, and chat. 
          After that, I created interactive Figma prototypes for profiles, cards, and chat screens. 
          Finally, I tested the flows with peers and iterated on layout and usability.
        </p>
      </section>

      <hr className="section-divider" />

      {/* Feature 1 */}
      <section className="project-section">
        <h2>Create Account Page</h2>
        <p>
          The Create Account page was designed to be simple and intuitive so users can quickly sign up and start using MeteorMate. 
          The onboarding emphasizes clarity and smooth flow for first-time users.
        </p>
        <img src={MMCreateAccount} alt="Create Account page interface showing form fields and sign-up button" style={{ width: "100%", margin: "12px 0" }} />
      </section>

      {/* Feature 2 */}
      <section className="project-section">
        <h2>Profile Creation</h2>
        <p>
          Users can create their profile by entering their year, major, and gender. 
          The white version matches MeteorMate branding better and represents the most updated design.
        </p>
        <div className="iteration-images">
          <img src={MMProfile} alt="Profile creation interface with fields for personal information" style={{ width: "100%", margin: "12px 0" }} />
          <img src={MMCreateAccountWhite} alt="Profile creation interface in white branding style" style={{ width: "100%", margin: "12px 0" }} />
        </div>
      </section>

      {/* Feature 3 */}
      <section className="project-section">
        <h2>Preferences</h2>
        <p>
          Users can input personal details, preferences, and roommate habits. 
          The setup is engaging and provides the information needed for accurate compatibility matching.
        </p>
        <div className="iteration-images">
          <img src={MMPreferences} alt="Preferences page showing user options for roommate habits and lifestyle" style={{ width: "50%", margin: "12px 0" }} />
          <img src={MMPersonalityWhite} alt="Question interface for personality matching" style={{ width: "50%", margin: "12px 0" }} />
          <img src={MMQuestionWhite} alt="Additional questions interface for roommate compatibility" style={{ width: "50%", margin: "12px 0" }} />
        </div>
      </section>

      {/* Feature 4 */}
      <section className="project-section">
        <h2>Main Page</h2>
        <p>
          The Main Page is the hub where users explore potential matches and navigate the app. 
          The design includes layout concepts and placeholders, ready for further refinement to make the final version fully interactive.
        </p>
        <div className="iteration-images">
          <img src={MMScreen} alt="Main page dashboard showing potential matches" style={{ width: "100%", margin: "12px 0" }} />
          <img src={MMScreenWhite} alt="Main page dashboard in white branding style" style={{ width: "100%", margin: "12px 0" }} />
        </div>
      </section>

      {/* Conclusion / Summary */}
      <section className="project-section">
        <h2>Summary</h2>
        <p>
          For MeteorMate, I designed the full UI/UX flow from account creation to profile setup, preferences, and the main matching dashboard. 
          I created interactive Figma prototypes, tested layouts and flows, and updated the design to match branding and usability goals. 
          The final design guides students through creating a profile, inputting preferences, and exploring compatible roommate matches, all in a clear, engaging, and easy-to-use interface.
        </p>
      </section>

    </div>
  );
}
