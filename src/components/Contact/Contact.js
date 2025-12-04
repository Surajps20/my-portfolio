import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particle from "../Particle";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      // Use backend URL from environment or detect from current domain
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 
        (window.location.hostname === 'localhost' 
          ? 'http://localhost:5001' 
          : `${window.location.protocol}//${window.location.hostname}:5001`);
      
      const response = await fetch(`${backendUrl}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatusMessage("✓ Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatusMessage(""), 5000);
      } else {
        const errorData = await response.json();
        setStatusMessage(`✗ Error: ${errorData.error || "Failed to send email"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage(`✗ Error: Could not connect to server. Please check if the backend is running.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="contact-section">
      <Particle />
      <Container style={{ position: "relative", zIndex: "10" }}>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col md={12}>
            <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
              Get In <strong className="purple">Touch</strong>
            </h1>
          </Col>
        </Row>

        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          <Col md={5} className="contact-info">
            <h3 style={{ paddingBottom: "20px" }}>Contact Information</h3>
            
            <div style={{ marginBottom: "20px" }}>
              <AiOutlineMail style={{ fontSize: "1.5em", marginRight: "10px" }} />
              <span>saravanansuraj95@gmail.com</span>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <AiOutlinePhone style={{ fontSize: "1.5em", marginRight: "10px" }} />
              <span>+91 94886 30606 </span>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <FaMapMarkerAlt style={{ fontSize: "1.5em", marginRight: "10px" }} />
              <span>Madurai, TamilNadu</span>
            </div>

            <p style={{ marginTop: "30px", color: "#c770f0" }}>
              Feel free to reach out to me for any questions or opportunities!
            </p>
          </Col>

          <Col md={7} className="contact-form">
            <Form onSubmit={handleSubmit}>
              {statusMessage && (
                <div style={{
                  padding: "10px",
                  marginBottom: "15px",
                  borderRadius: "5px",
                  backgroundColor: statusMessage.includes("✓") ? "#d4edda" : "#f8d7da",
                  color: statusMessage.includes("✓") ? "#155724" : "#721c24",
                  border: `1px solid ${statusMessage.includes("✓") ? "#c3e6cb" : "#f5c6cb"}`
                }}>
                  {statusMessage}
                </div>
              )}

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Your message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Contact;
