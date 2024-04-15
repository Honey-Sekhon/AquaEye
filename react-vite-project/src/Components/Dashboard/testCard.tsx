import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop, faRedo } from "@fortawesome/free-solid-svg-icons";
import "../CSS/TestCard.css";

interface TestCardProps {
  testTitle: string;
  players: string[];
  showTimer?: boolean;
}

const TestCard: React.FC<TestCardProps> = ({
  testTitle,
  players,
  showTimer,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const selectPlayer = (player: string) => {
    setSelectedPlayer(player);
  };

  const startTimeRef = useRef<number | null>(null);

  const startTest = () => {
    // Record the current time as the start time
    startTimeRef.current = performance.now();
    setIsActive(true);
  };

  const updateTimer = () => {
    if (startTimeRef.current != null) {
      const elapsedTime = performance.now() - startTimeRef.current;
      setTime(elapsedTime / 1000); // Convert milliseconds to seconds
    }
  };

  const stopTest = () => {
    console.log("Stop Test");
    setIsActive(false);
  };

  const resetTest = () => {
    console.log("Reset Test");
    setIsActive(false);
    setTime(0);
  };

  // Handle space bar to stop
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === " " && isActive) {
        stopTest();
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isActive]);

  // Update time
  useEffect(() => {
    let interval: number | undefined;
    if (isActive) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime + 0.01);
      }, 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{testTitle}</CardTitle>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle caret>
            {selectedPlayer || "Select Player"}
          </DropdownToggle>
          <DropdownMenu>
            {players.map((player) => (
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
            {showTimer && <div>Time: {time.toFixed(2)}s</div>}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default TestCard;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardBody,
//   CardTitle,
//   Button,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlay, faStop, faRedo } from "@fortawesome/free-solid-svg-icons";
// import "../CSS/TestCard.css";

// const TestCard: React.FC<TestCardProps> = ({ testTitle, players }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
//   const [time, setTime] = useState(0);
//   const [isActive, setIsActive] = useState(false);

//   const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
//   const startTimer = () => setIsActive(true);
//   const stopTimer = () => setIsActive(false);
//   const selectPlayer = (player: string) => {
//     setSelectedPlayer(player);
//   };
//   const resetTimer = () => {
//     setIsActive(false);
//     setTime(0);
//   };

//   // Handle space bar to stop
//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === " " && isActive) {
//         stopTimer();
//       }
//     };
//     window.addEventListener("keydown", handleKeyPress);

//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [isActive]);

//   // Update time
//   useEffect(() => {
//     let interval = null;
//     if (isActive) {
//       interval = setInterval(() => {
//         setTime((prevTime) => prevTime + 0.01);
//       }, 10);
//     } else if (!isActive && time !== 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isActive, time]);

//   // Placeholder functions for button clicks
//   // const startTest = () => console.log("Start Test");
//   const stopTest = () => console.log("Stop Test");
//   const resetTest = () => console.log("Reset Test");

//   const startTest = () => {
//     fetch("http://localhost:5000/dashboard", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ testType: testTitle.toLowerCase() }),
//     })
//       .then((response) => response.text())
//       .then((data) => alert(data))
//       .catch((error) => console.error("Error:", error));
//   };

//   return (
//     <Card>
//       <CardBody>
//         <CardTitle tag="h5">{testTitle}</CardTitle>
//         <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
//           <DropdownToggle caret>
//             {selectedPlayer || "Select Player"}
//           </DropdownToggle>
//           <DropdownMenu>
//             {players.map((player) => (
//               <DropdownItem key={player} onClick={() => selectPlayer(player)}>
//                 {player}
//               </DropdownItem>
//             ))}
//           </DropdownMenu>
//         </Dropdown>
//         {selectedPlayer && (
//           <div className="test-controls">
//             <Button color="success" onClick={startTest}>
//               <FontAwesomeIcon icon={faPlay} /> Start
//             </Button>
//             <Button color="danger" onClick={stopTest}>
//               <FontAwesomeIcon icon={faStop} /> Stop
//             </Button>
//             <Button color="secondary" onClick={resetTest}>
//               <FontAwesomeIcon icon={faRedo} /> Reset
//             </Button>
//           </div>
//         )}
//       </CardBody>
//     </Card>
//   );
// };

// interface TestCardProps {
//   testTitle: string;
//   players: string[]; // Assuming 'players' is an array of strings
// }

// export default TestCard;
