import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

// IMPORT YOUR PROJECT IMAGES HERE
import adminDashboard from "../../Assets/Projects/admin-dashboard.png";
import restaurant from "../../Assets/Projects/restaurant.png";
import dragDrop from "../../Assets/Projects/drag-drop.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

          {/* Project 1: Ecommerce Saree website */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ecommercesaree}
              isBlog={false}
              title="Ecommerce Saree Website"
              description=" A fully functional ecommerce website for sarees, built with HTML, CSS, and JavaScript. Features include a user-friendly interface, product categories, and a secure payment gateway. The site is designed to provide an optimal shopping experience on both desktop and mobile devices."
              ghLink="#" // Keep GitHub link as fallback or remove if not needed
              demoLink="https://surajps20.github.io/Ecommerce-saree-site/" // REPLACE THIS WITH ACTUAL LIVE LINK
            />
          </Col>

          {/* Project 2: Admin Dashboard */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={adminDashboard}
              isBlog={false}
              title="Admin Dashboard with RBAC"
              description="A comprehensive administration panel built with pure PHP and MySQL. Features include Role-Based Access Control (Admin/User), a Kanban board for task management, and full CRUD capabilities for managing website content like posters and videos. Implements secure session management and password hashing."
              ghLink="#" // Keep GitHub link as fallback or remove if not needed
              demoLink="https://your-live-demo-link.com/admin-dashboard" // REPLACE THIS WITH ACTUAL LIVE LINK
            />
          </Col>

          {/* Project 3: Restaurant Website */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={restaurant}
              isBlog={false}
              title="Raka Restaurant Booking System"
              description="A dynamic restaurant website featuring a categorized menu and an automated table booking system. Users can select dates, times, and guest counts, with the system automatically calculating a 50% advance payment. Built with PHP, MySQL, HTML5, and CSS3."
              ghLink="#"
              demoLink="https://your-live-demo-link.com/restaurant" // REPLACE THIS WITH ACTUAL LIVE LINK
            />
          </Col>

      

          {/* Project 4: Drag and Drop Interface */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dragDrop}
              isBlog={false}
              title="Drag and Drop Interface"
              description="An interactive drag-and-drop interface built with JavaScript and PHP. Allows users to easily reorder items or upload files by dragging them onto a designated area. The backend processes the dropped items and updates the database accordingly."
              ghLink="#"
              demoLink="https://your-live-demo-link.com/drag-drop" // REPLACE THIS WITH ACTUAL LIVE LINK
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;