import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Suraj</span> from <span className="purple"> Madurai, India.</span>
            <br />
            I am currently working as a <span className="purple">Web Developer Intern</span>.
            <br />
            I specialize in building full-stack web applications using <span className="purple">PHP and MySQL</span>.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Photo Editing & Graphic Design 🎨
            </li>
            <li className="about-activity">
              <ImPointRight /> Learning New Web Technologies 💡
            </li>
            <li className="about-activity">
              <ImPointRight /> Web Surfing 🌍
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Suraj</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;