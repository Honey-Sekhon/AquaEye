import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import {
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faStickyNote,
  faCalendarAlt,
  faChartBar,
  faBullhorn,
  faSeedling,
  faTicketAlt,
  faSignOutAlt,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import "../CSS/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle sign out
  const handleSignOut = () => {
    navigate("/"); // Redirect to the root URL
  };

  return (
    <>
      <div className="sidebar d-flex flex-column justify-content-between vh-100">
        <div>
          <div className="sidebar-header">
            <h1>Aqua Polo</h1> {/* Title update */}
          </div>
          <ListGroup flush className="flex-grow-1">
            <ListGroupItem tag="a" action className="active">
              <FontAwesomeIcon icon={faTachometerAlt} className="fa-icon" />{" "}
              Dashboard
            </ListGroupItem>
            <ListGroupItem tag="a" action>
              <FontAwesomeIcon icon={faChartBar} className="fa-icon" />{" "}
              Analytics
            </ListGroupItem>
            <ListGroupItem tag="a" action>
              <FontAwesomeIcon icon={faTicketAlt} className="fa-icon" /> Event
            </ListGroupItem>
            <ListGroupItem tag="a" action>
              <FontAwesomeIcon icon={faVideoCamera} className="fa-icon" />{" "}
              Tutorials
            </ListGroupItem>
            <ListGroupItem tag="a" action>
              <FontAwesomeIcon icon={faStickyNote} className="fa-icon" /> Notes
            </ListGroupItem>

            <ListGroupItem tag="a" action>
              <FontAwesomeIcon icon={faCalendarAlt} className="fa-icon" />{" "}
              Calendar
            </ListGroupItem>
            <ListGroupItem tag="a" action>
              <FontAwesomeIcon icon={faBullhorn} className="fa-icon" />{" "}
              Announcements
            </ListGroupItem>
          </ListGroup>
        </div>
        <ListGroupItem
          tag="button"
          action
          onClick={handleSignOut}
          className="text-center sign-out"
          style={{
            padding: "1rem",
            backgroundColor: "#ffffff",
            color: "#495057",
            borderTop: "1px solid #f8f9fa",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#e9ecef")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#ffffff")
          }
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="fa-icon" /> Sign out
        </ListGroupItem>
      </div>
    </>
  );
};

interface InfoCardProps {
  title: string;
  content: string;
  footer: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content, footer }) => {
  return (
    <Card className="info-card my-3">
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardText>{content}</CardText>
        <div className="text-center mt-3">
          <button className="btn btn-info">{footer}</button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Sidebar;
