import React from "react";
import Homepage from "./pages/Homepage";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SinglePage from "./pages/SinglePage";
import Navbar from "./components/Navbar";
import PlantsPage from "./pages/PlantsPage";

const App = () => {
  return (
    <div>
      {/* <Homepage /> */}
      {/* <CalendarPage /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<PlantsPage />} />
        <Route path="/plant/:id" element={<SinglePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
};

export default App;
