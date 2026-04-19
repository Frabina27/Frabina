import React, { useState } from "react";
import "../../css/Designs.css";

import MeteorMateHero from "../../images/MM/MeteorMate.png";
import MMCreateAccount from "../../images/MM/MMCreateAccount.png";
import MMCreateAccountWhite from "../../images/MM/MMCreateAccountWhite.png";
import MMPersonalityWhite from "../../images/MM/MMPersonalityWhite.png";
import MMPreferences from "../../images/MM/MMPreferences.png";
import MMProfile from "../../images/MM/MMProfile.png";
import MMQuestion from "../../images/MM/MMQuestion.png";
import MMQuestionWhite from "../../images/MM/MMQuestionWhite.png";
import MMScreen from "../../images/MM/MMScreen.png";
import MMScreenWhite from "../../images/MM/MMScreenWhite.png";

export default function MeteorMate() {
  const overviewStats = [
    {
      label: "Expected Launch",
      value: "Summer 2026",
    },
    {
      label: "Primary Audience",
      value: "UTD students",
    },
    {
      label: "Projected Reach",
      value: "29,000+ students",
    },
    {
      label: "Core Value",
      value: "Faster roommate matching",
    },
  ];

  const process = [
    {
      title: "Problem Space",
      text:
        "Students currently search for roommates across scattered platforms like Reddit, Discord, and group chats, which makes the process unstructured, time-consuming, and difficult to trust.",
    },
    {
      title: "User Needs",
      text:
        "We centered the experience around safety, compatibility, speed, and clarity—helping students quickly understand whether a living situation fits their habits and preferences.",
    },
    {
      title: "Product Strategy",
      text:
        "MeteorMate brings the full roommate search into one platform with guided onboarding, profile creation, preference filters, and AI-assisted matching.",
    },
    {
      title: "Design Direction",
      text:
        "The interface was designed to feel approachable and modern, balancing social discovery with structure so students can compare options without the chaos of informal channels.",
    },
    {
      title: "Outcome",
      text:
        "The result is a platform concept that can help thousands of students find better roommate matches in minutes instead of spending days searching across disconnected communities.",
    },
  ];

  const features = [
    {
      title: "Feature 1: Guided Onboarding",
      text:
        "MeteorMate starts with a streamlined account creation flow that introduces new users to the platform quickly and reduces friction during sign-up.",
      images: [MMCreateAccount, MMCreateAccountWhite],
    },
    {
      title: "Feature 2: Personality & Lifestyle Matching",
      text:
        "Students answer personality-based and lifestyle-focused questions so the platform can understand compatibility beyond basic demographics. This helps match users based on habits, preferences, and day-to-day living style.",
      images: [MMPersonalityWhite, MMQuestion, MMQuestionWhite],
    },
    {
      title: "Feature 3: Smart Preference Filters",
      text:
        "Users can filter by the factors that matter most in a roommate search, such as cleanliness, sleep schedule, guest preferences, study habits, and overall living environment.",
      images: [MMPreferences],
    },
    {
      title: "Feature 4: AI-Powered Matches",
      text:
        "Instead of manually sorting through endless posts on Reddit or Discord, MeteorMate uses AI-assisted matching to surface highly compatible roommate options in minutes.",
      images: [MMScreen, MMScreenWhite],
    },
    {
      title: "Feature 5: Rich Student Profiles",
      text:
        "Each user has a profile that gives potential roommates a clearer picture of who they are, what they value in a shared space, and whether they would be a strong fit.",
      images: [MMProfile],
    },
  ];

  return (
    <div className="project-page container">
      <header className="project-hero">
        <p className="project-label">ACM Development / Product Design</p>

        <h1>MeteorMate</h1>

        <p className="project-description">
          MeteorMate is a roommate-matching platform designed for ACM
          Development and expected to launch in Summer 2026. Built for a
          student population of more than 29,000, the platform helps students
          find compatible roommates through structured profiles, lifestyle
          filters, and an AI matching feature that delivers strong matches in
          minutes.
        </p>

        <img
          src={MeteorMateHero}
          alt="MeteorMate platform preview"
          className="project-hero-image"
          style={{ maxWidth: "950px", width: "78%" }}
        />
      </header>

      <section className="project-section" style={{ color: "#000" }}>
        <h2>Overview</h2>

        <p>
          Finding a roommate is still surprisingly messy for students. Many are
          forced to rely on unorganized platforms like Reddit, Discord, and
          informal group chats, where posts are inconsistent, information is
          incomplete, and compatibility is hard to evaluate. MeteorMate was
          designed to replace that fragmented experience with a centralized,
          student-focused platform.
        </p>

        <div className="process-steps" style={{ marginTop: "24px" }}>
          {overviewStats.map((item, index) => (
            <div className="step-card" key={index}>
              <h4>{item.label}</h4>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="project-section" style={{ color: "#000" }}>
        <h2>The Problem</h2>

        <p>
          Existing roommate searches often depend on scrolling through hundreds
          of posts, messaging strangers one by one, and trying to compare living
          preferences with little structure. This creates unnecessary stress for
          students who are already making high-stakes housing decisions.
        </p>

        <p>
          MeteorMate addresses this by creating a more trustworthy and efficient
          experience—one where students can discover, compare, and match with
          people who fit their ideal living situation.
        </p>
      </section>

      <section className="project-section" style={{ color: "#000" }}>
        <h2>Design Goal</h2>

        <p>
          The goal of MeteorMate is to make roommate discovery feel intentional
          rather than random. By combining guided onboarding, profile-based
          discovery, and AI-supported recommendations, the platform helps users
          move from uncertainty to a curated shortlist of strong roommate
          options.
        </p>
      </section>

      <section className="project-section" style={{ color: "#000" }}>
        <h2>Design Process</h2>

        <div className="process-steps">
          {process.map((step, index) => (
            <div className="step-card" key={index}>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="project-section" style={{ color: "#000" }}>
        <h2>Core Features</h2>

        <div className="iteration-images">
          {features.map((feature, index) => (
            <div className="info-card" key={index}>
              <h3 style={{ marginBottom: "12px" }}>{feature.title}</h3>

              <p style={{ marginBottom: "18px" }}>{feature.text}</p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                  justifyContent: "center",
                }}
              >
                {feature.images.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img}
                    alt={feature.title}
                    className="project-image"
                    style={{
                      width: feature.images.length === 3 ? "31%" : feature.images.length === 2 ? "46%" : "78%",
                      maxWidth: "700px",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="project-section" style={{ color: "#000" }}>
        <h2>Impact</h2>

        <p>
          MeteorMate creates a more scalable and student-centered way to solve a
          recurring campus problem. Instead of relying on scattered social posts,
          students get a platform built specifically for housing compatibility,
          helping them save time, reduce uncertainty, and make more confident
          roommate decisions.
        </p>
      </section>

      <section className="project-section" style={{ color: "#000" }}>
        <h2>Takeaways</h2>

        <p>
          This project focused on designing a practical product for a real
          student need. It pushed the work beyond visual design into platform
          thinking—considering user trust, onboarding friction, filtering logic,
          and how AI can support better decision-making in a high-stakes social
          workflow.
        </p>
      </section>
    </div>
  );
}
