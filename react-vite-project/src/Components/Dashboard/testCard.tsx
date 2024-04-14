import React, { useState } from "react";
import { Card, CardBody, CardTitle, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faRedo } from "@fortawesome/free-solid-svg-icons";
import "../CSS/TestCard.css";

const TestCard: React.FC<TestCardProps> = ({ testTitle, players }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null); 

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const selectPlayer = (player:string) => {
    setSelectedPlayer(player);
  };

  // Placeholder functions for button clicks
  const startTest = () => console.log("Start Test");
  const stopTest = () => console.log("Stop Test");
  const resetTest = () => console.log("Reset Test");

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{testTitle}</CardTitle>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>
            {selectedPlayer || "Select Player"}
          </DropdownToggle>
          <DropdownMenu>
            {players.map(player => (
              <DropdownItem key={player} onClick={() => selectPlayer(player)}>
                {player}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {selectedPlayer && (
          <div className="test-controls">
            <Button color="success" onClick={startTest}>
              <FontAwesomeIcon icon={faPlay} /> Start
            </Button>
            <Button color="danger" onClick={stopTest}>
              <FontAwesomeIcon icon={faStop} /> Stop
            </Button>
            <Button color="secondary" onClick={resetTest}>
              <FontAwesomeIcon icon={faRedo} /> Reset
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

interface TestCardProps {
  testTitle: string;
  players: string[]; // Assuming 'players' is an array of strings
}

export default TestCard;
