import TestCard from "./testCard";

// This would be your TestingSection.tsx
const TestingSection: React.FC = () => {
  // This array could come from props, state, or could be dynamically fetched
  const players = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"
    , "Player 6", "Player 7", "Player 8", "Player 9", "Player 10"
  ];

  return (
    <>
    <h1 style={{padding: "20px", marginBottom:"0px", paddingBottom:"0px"}}>Tests</h1>
      <div className="testing-section" style={{margin:"20px"}}>
        <div className="row">
          <div className="col-md-4">
            <TestCard testTitle="Endurance" players={players} />
          </div>
          <div className="col-md-4">
            <TestCard testTitle="Passing" players={players} />
          </div>
          <div className="col-md-4">
            <TestCard testTitle="Swim Time" players={players} showTimer={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TestingSection;
