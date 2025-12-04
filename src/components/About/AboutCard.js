import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          {/* Introduction Section */}
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Suraj</span> from <span className="purple">Madurai, India.</span>
            <br />
            I completed a <span className="purple">3-month Web Developer Internship</span> where I gained hands-on experience in full-stack development.
            <br />
            I specialize in building full-stack web applications using <span className="purple">PHP, MySQL, JavaScript, React, and Bootstrap</span>.
          </p>

          {/* Education Section */}
          <h5 style={{ marginTop: "25px", marginBottom: "15px", color: "#c770f0" }}>
            <ImPointRight style={{ marginRight: "10px" }} />
            Education
          </h5>
          <ul style={{ marginLeft: "20px", marginBottom: "20px" }}>
            <li className="about-activity">
              <span><strong>Bachelor's Degree in [CSE]</strong> - [KLN College of Engineering]</span>
            </li>
            <li className="about-activity">
              <span><strong>Year of Passing:</strong> [2025]</span>
            </li>
            {/* <li className="about-activity">
              <span><strong>CGPA/Percentage:</strong> [Your Score]</span>
            </li> */}
          </ul>

          {/* Experience Section */}
          {/* <h5 style={{ marginBottom: "15px", color: "#c770f0" }}>
            <ImPointRight style={{ marginRight: "10px" }} />
            Professional Experience
          </h5>
          <ul style={{ marginLeft: "20px", marginBottom: "20px" }}>
            <li className="about-activity">
              <span><strong>Web Developer Intern</strong> - [Company Name], Madurai</span>
            </li>
            <li className="about-activity">
              <span><strong>Duration:</strong> [Start Date] - [End Date] (3 months)</span>
            </li>
            <li className="about-activity">
              <span><strong>Key Responsibilities:</strong> Full-stack development, Database management, UI/UX implementation</span>
            </li>
          </ul> */}

          {/* Interests & Hobbies */}
          <h5 style={{ marginBottom: "15px", color: "#c770f0" }}>
            <ImPointRight style={{ marginRight: "10px" }} />
            Interests & Hobbies
          </h5>
          <ul style={{ marginLeft: "0px" }}>
            <li className="about-activity">
              <ImPointRight /> Photo Editing & Graphic Design 🎨
            </li>
            <li className="about-activity">
              <ImPointRight /> Learning New Web Technologies 💡
            </li>
            <li className="about-activity">
              <ImPointRight /> Web Surfing & Research 🌍
            </li>
            <li className="about-activity">
              <ImPointRight /> Open Source Contribution 💻
            </li>
            <li className="about-activity">
              <ImPointRight /> Competitive Programming 🏆
            </li>
          </ul>

          {/* Motivation Quote */}
          <p style={{ color: "rgb(155 126 172)", marginTop: "25px" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Suraj</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;