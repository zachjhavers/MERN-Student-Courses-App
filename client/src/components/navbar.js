import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function myNavbar() {
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/createCourse">Add Course</Nav.Link>
          <Nav.Link href="/createStudent">Add Student</Nav.Link>
          <Nav.Link href="/login">Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
