import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

import "../CSS/Sidebar.css";
import "../CSS/Overview.css";

const Overview = () => {
  return (
  <>
  <h1 style={{paddingLeft: "20px", paddingTop: "20px", marginBottom:"0px"}}>Overview</h1>
    <div className="container pt-4" id="overviewID">
      <div className="row">
        <div className="col-md-6 col-lg-3">
          <InfoCard title="Total Teams" content="8 teams" footer="View Teams" />
        </div>
        <div className="col-md-6 col-lg-3">
          <InfoCard
            title="Total Athletes"
            content="40 Athletes"
            footer="View Athletes"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <InfoCard
            title="Weekly Schedule"
            content="Your schedule for the week"
            footer="View Schedule"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <InfoCard
            title="Upcoming Games"
            content="Next 3 scheduled games"
            footer="View Games"
          />
        </div>
      </div>
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

export default Overview;
