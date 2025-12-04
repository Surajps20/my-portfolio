import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

// IMPORT YOUR PROJECT IMAGES HERE
import adminDashboard from "../../Assets/Projects/admin-dashboard.png";
import restaurant from "../../Assets/Projects/restaurant.png";
import dragDrop from "../../Assets/Projects/drag-drop.png";
import ecommerceSaree from "../../Assets/Projects/Ecommerce-saree.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I completed during my 3-month Web Developer Internship and personal development.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

          {/* Project 1: Ecommerce Saree website */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ecommerceSaree}
              isBlog={false}
              title="Ecommerce Saree Website"
              description=" A fully functional ecommerce website for sarees, built with HTML, CSS, and JavaScript. Features include a user-friendly interface, product categories, and a secure payment gateway. The site is designed to provide an optimal shopping experience on both desktop and mobile devices."
              ghLink="https://github.com/Surajps20/Ecommerce-saree-site" // Keep GitHub link as fallback or remove if not needed
              demoLink="https://surajps20.github.io/Ecommerce-saree-site/" // REPLACE THIS WITH ACTUAL LIVE LINK
            />
          </Col>

          {/* Project 2: Admin Dashboard */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={adminDashboard}
              isBlog={false}
              title="Admin Dashboard with RBAC"
              description="A comprehensive administration panel built with pure PHP and MySQL during my internship. Features include Role-Based Access Control (Admin/User), a Kanban board for task management, and full CRUD capabilities for managing website content like posters and videos. Implements secure session management and password hashing."
              ghLink="#"
              demoLink="https://your-live-demo-link.com/admin-dashboard"
            />
          </Col>

          {/* Project 3: Restaurant Website */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={restaurant}
              isBlog={false}
              title="Raka Restaurant Booking System"
              description="A dynamic restaurant website completed during my internship, featuring a categorized menu and an automated table booking system. Users can select dates, times, and guest counts, with the system automatically calculating a 50% advance payment. Built with PHP, MySQL, HTML5, and CSS3."
              ghLink="#"
              demoLink="https://your-live-demo-link.com/restaurant"
            />
          </Col>

      

          {/* Project 4: Drag and Drop Interface */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dragDrop}
              isBlog={false}
              title="Drag and Drop Interface"
              description="An interactive drag-and-drop interface built with JavaScript and PHP. Allows users to easily reorder items or upload files by dragging them onto a designated area. The backend processes the dropped items and updates the database accordingly."
              ghLink="https://github.com/Surajps20/Drag-n-drop"
              demoLink="https://your-live-demo-link.com/drag-drop" // REPLACE THIS WITH ACTUAL LIVE LINK
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;