import React from "react";
import CalendarPage from "./CalendarPage";
import Homepage from "./pages/Homepage";
import "./index.css";
import PlantsPage from "./pages/Plantspage";

const App = () => {
  return (
    <div>
      <CalendarPage />
      <Homepage />
      <PlantsPage />
    </div>
  );
};

export default App;
