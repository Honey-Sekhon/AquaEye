import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavigationBar: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Coach Dashboard</Navbar.Brand>
      <Nav className="mr-auto">
        <LinkContainer to="/players">
          <Nav.Link>Players</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/sessions">
          <Nav.Link>Sessions</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/performance">
          <Nav.Link>Performance</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
