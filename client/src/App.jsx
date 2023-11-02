import React from "react";
import Homepage from "./pages/Homepage";
import "./index.css";
import PlantsPage from "./pages/PlantsPage"; // Correct the import path
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter

import SinglePage from "./pages/SinglePage";

const App = () => {
  return (
    <div>
      {/* <Homepage /> */}
      {/* <CalendarPage /> */}
      <BrowserRouter>
        {" "}
        {/* Wrap your routes with BrowserRouter */}
        <Routes>
          <Route path="/" element={<PlantsPage />} />
          <Route path="/plant/:id" element={<SinglePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
