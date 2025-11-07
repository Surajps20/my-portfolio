import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiPhp, DiMysql, DiHtml5, DiCss3, DiJavascript1, DiReact } from "react-icons/di";
import { SiBootstrap, SiJson, SiComposer } from "react-icons/si";
import { MdEmail, MdVpnKey } from "react-icons/md"; // New icons for PHPMailer & Auth

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {/* CORE BACKEND */}
      <Col xs={4} md={2} className="tech-icons">
        <DiPhp />
        <div className="tech-icons-text">PHP</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiMysql />
        <div className="tech-icons-text">MySQL</div>
      </Col>

       {/* CORE FRONTEND */}
      <Col xs={4} md={2} className="tech-icons">
        <DiHtml5 />
        <div className="tech-icons-text">HTML5</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiCss3 />
        <div className="tech-icons-text">CSS3</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiJavascript1 />
        <div className="tech-icons-text">JavaScript</div>
      </Col>

      {/* FRAMEWORKS & LIBRARIES */}
      <Col xs={4} md={2} className="tech-icons">
        <SiBootstrap />
        <div className="tech-icons-text">Bootstrap</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiReact />
        <div className="tech-icons-text">React.js</div>
      </Col>

      {/* API & INTEGRATIONS (New based on history) */}
      <Col xs={4} md={2} className="tech-icons">
        <MdVpnKey />
        <div className="tech-icons-text">HybridAuth (OAuth)</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <MdEmail />
        <div className="tech-icons-text">PHPMailer (SMTP)</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiJson />
        <div className="tech-icons-text">REST APIs & JSON</div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiComposer />
        <div className="tech-icons-text">Composer</div>
      </Col>
    </Row>
  );
}

export default Techstack;