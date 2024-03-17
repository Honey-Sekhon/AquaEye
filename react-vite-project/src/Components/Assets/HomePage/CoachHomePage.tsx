import React from "react";
import { Container, Row, Col, Button, Card } from "reactstrap";

const CoachHomePage: React.FC = () => {
  // Placeholder data
  const players = [{ name: "Player 1" }, { name: "Player 2" }]; // Add more players as needed

  return (
    <Container fluid="lg">
      <Row className="my-4">
        <Col>
          <h1>Coach Dashboard</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card body className="mb-3">
            <h5>Player Metrics</h5>
            {/* Placeholder for metrics. In practice, you'd map over data to dynamically create charts or tables */}
            <p>Performance charts and stats here</p>
            <Button>Export Data</Button>
          </Card>
          <Card body>
            <h5>Team Feedback</h5>
            {/* Placeholder for feedback form or announcements */}
            <p>Feedback form or latest announcements</p>
          </Card>
        </Col>
        <Col md={6}>
          <Card body>
            <h5>Players</h5>
            <ul>
              {players.map((player) => (
                <li key={player.name}>
                  {player.name} - <a href="#">View Profile</a>
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CoachHomePage;
