import React from "react";
import "./PlantsPage.css";

const PlantsPage = () => {
  return (
    <div id="plants-container">
      <div id="plants-search">
        <button>Search By Name</button>
        <button>Search By Image</button>
      </div>
      <div className="grid-container" id="plants-list">
        <div className="gird-item">1</div>
        <div className="gird-item">2</div>
        <div className="gird-item">3</div>
        <div className="gird-item">4</div>
        <div className="gird-item">5</div>
        <div className="gird-item">6</div>
      </div>
      <div id="plants-pagination"></div>
    </div>
  );
};

export default PlantsPage;
