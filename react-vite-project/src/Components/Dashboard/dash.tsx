// dash.tsx
import React from "react";
import Sidebar from "./sidebar";
import Overview from "./overview";
import TestingSection from "./testingSection";
import NotesSection from "./notes";
import AnnouncementsSection from "./announcements";
import "../CSS/Dash.css";

const Dash: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Overview />
        <TestingSection />
        <div className="row justify-content-center">
          <div className="col-6" style={{paddingRight: "0px"}}>
            <NotesSection />
          </div>
          <div className="col-6"style={{paddingLeft: "0px"}}>
            <AnnouncementsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
