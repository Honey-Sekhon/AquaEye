import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useUser } from "../Components/Assets/LoginSignup/UserContext";

const NavigationBar = () => {
  const { user } = useUser();

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">
        {user ? `${user.name}'s Dashboard` : "Dashboard"}
      </Navbar.Brand>
      {/* Remaining navbar content */}
    </Navbar>
  );
};

export default NavigationBar;
