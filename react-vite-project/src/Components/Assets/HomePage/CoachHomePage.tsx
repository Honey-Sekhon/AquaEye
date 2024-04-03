import NavigationBar from "../../NavigationBar";
import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  CardHeader,
  ListGroupItem, // Import the correct components
} from "reactstrap";

const CoachDashboard: React.FC = () => {
  // Placeholder for state and effects to fetch data

  return (
    <>
      <NavigationBar />
      <Container fluid>
        <br />
        <Row>
          {/* List all players enrolled under the coach */}
          <Col md={6}>
            <Card>
              <CardHeader>My Players</CardHeader> {/* Use CardHeader */}
              <ListGroup>
                {/* Use ListGroupItem */}
                <ListGroupItem>Player 1</ListGroupItem>
                <ListGroupItem>Player 2</ListGroupItem>
              </ListGroup>
            </Card>
          </Col>

          {/* List all players in the club */}
          <Col md={6}>
            <Card>
              <CardHeader>Club Players</CardHeader> {/* Use CardHeader */}
              <ListGroup>
                {/* Use ListGroupItem */}
                <ListGroupItem>Club Player 1</ListGroupItem>
                <ListGroupItem>Club Player 2</ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        {/* Training session information */}
        <Row className="mt-4">
          <Col md={6}>
            <Card>
              <CardHeader>Training Sessions</CardHeader> {/* Use CardHeader */}
              {/* Placeholder or component for training sessions */}
            </Card>
          </Col>

          {/* Performance chart placeholder */}
          <Col md={6}>
            <Card>
              <CardHeader>Player Performance</CardHeader> {/* Use CardHeader */}
              {/* Placeholder or component for performance chart */}
            </Card>
          </Col>
        </Row>

        {/* Announcement section */}
        <Row className="mt-4">
          <Col>
            <Card>
              <CardHeader>Announcements</CardHeader> {/* Use CardHeader */}
              {/* Placeholder or component for making announcements */}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CoachDashboard;
