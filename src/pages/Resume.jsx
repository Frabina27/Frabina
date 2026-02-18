import React from "react";
import "../css/Resume.css";


export default function Resume() {
  return (
    <div className="resume-container">
      <div className="resume-header">
        <h1>Resume</h1>
        <p className="small">A timeline of my learning and experience! </p>
      </div>
<div className="section-divider">
        <h2>Education</h2>
      </div>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-card">
            <div className="timeline-header">
              <div className="timeline-title">
                <h3>The University of Texas at Dallas</h3>
                <div className="timeline-subtitle">Bachelor's Degree in Computer Science</div>
              
              </div>
              <div className="timeline-date">Expected: May 2027</div>
            </div>
            <div className="timeline-content">
              <p>Relevant coursework: Software Engineering, Data Structures & Algorithms, Discrete Math, Programming Paradigms</p>
              <p>Minor in STEM Education & Certification in Cyber Defense</p>
            </div>
          </div>
        </div>
      </div>

      {/* WORK EXPERIENCE SECTION */}
      <div className="section-divider">
        <h2>Work Experience</h2>
      </div>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-card">
            <div className="timeline-header">
              <div className="timeline-title">
                <h3>Wize Computing Academy</h3>
                <div className="timeline-subtitle">Instructor</div>
              </div>
              <div className="timeline-date">Aug 2025 - Present</div>
            </div>
            <div className="timeline-content">
              <p>Instruct middle school students in programming and robotics through interactive lessons and hands-on projects</p>
              <p>Introduce core CS concepts such as loops, conditionals, and variables using beginner-friendly tools</p>
              <p>Foster classroom positivity, problem-solving, individualism, creativity, and teamwork through tailored lesson plans</p>
            </div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-card">
            <div className="timeline-header">
              <div className="timeline-title">
                <h3>Grade Potential Tutoring</h3>
                <div className="timeline-subtitle">Private Tutor</div>
              </div>
              <div className="timeline-date">Sep 2024 - Present</div>
            </div>
            <div className="timeline-content">
              <p>Specialized instructor in a variety of K-12 and college-level lessons</p>
              <p>Provided individualized tutoring on SAT/ACT Prep and college-level Computer Science such as Python and C++</p>
              <p>Developed interactive project-based learning to enhance understanding in students</p>
            </div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-card">
            <div className="timeline-header">
              <div className="timeline-title">
                <h3>Lavner Education</h3>
                <div className="timeline-subtitle">Curriculum Developer & STEM Instructor</div>
              </div>
              <div className="timeline-date">June 2024 - May 2025</div>
            </div>
            <div className="timeline-content">
              <p>Designed and implemented learning materials to enhance knowledge retention </p>
              <p>Utilized data-driven insights to evaluate program effectiveness and improved content</p>
              <p>Instructed over 20 students in Lego Robotics, Scripting, Tech Stocks, and Cyber Security </p>
            </div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-card">
            <div className="timeline-header">
              <div className="timeline-title">
                <h3>The MSR Group</h3>
                <div className="timeline-subtitle">Customer Service Representative</div>
              </div>
              <div className="timeline-date">July 2022 - April 2024</div>
            </div>
            <div className="timeline-content">
              <p>Managed and organized client data, gathering key information, identifying, and reporting service gaps to improve customer satisfaction within companies</p>
              <p>Demonstrated strong interpersonal skills by addressing concerns and providing timely responses to clients</p>
              <p>Impact you made or skills you developed</p>
            </div>
          </div>
        </div>
      </div>

      {/* CLUBS & ORGANIZATIONS SECTION */}
      <div className="section-divider">
        <h2>Clubs & Organizations</h2>
      </div>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-card">
            <div className="timeline-header">
              <div className="timeline-title">
                <h3>ACM Development</h3>
                <div className="timeline-subtitle">Design Lead</div>
              </div>
              <div className="timeline-date">Jan 2025 - Present</div>
            </div>
            <div className="timeline-content">
              <p>Designed a web platform aimed at simplifying the roommate search process for college students</p>
              <p>Created wireframes and high-fidelity layouts in Figma, establishing a cohesive user experience</p>
              <p>Worked closely with developers to ensure seamless implementation of UI designs</p>
            </div>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-card">
            <div className="timeline-header">
              <div className="timeline-title">
                <h3>Google Student Developer Club</h3>
                <div className="timeline-subtitle">Director of Marketing & Events</div>
              </div>
              <div className="timeline-date">August 2024 - Present</div>
            </div>
            <div className="timeline-content">
              <p>Lead event planning and promotion for all GDSC initiatives and workshops</p>
              <p>Collaborated with technical and design teams to create marketing materials and manage outreach</p>
              <p>Managed events and logistics to increase student engagement across events</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}