import React from "react";
import Homepage from "./pages/Homepage";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import LoginForm from "./components/Loginform";
import RegisterForm from "./components/RegisterForm";
import SinglePage from "./pages/SinglePage";
import Navbar from "./components/Navbar";
import PlantsPage from "./pages/Plantspage";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import AboutUs from "./components/AboutUs";
import PlantIdentifier from "./pages/PlantIdentifier";
import MyPlantPage from "./pages/MyPlantPage";
import { useAuth } from "./Context/AuthProvider";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/plantIdentifier" element={<PlantIdentifier />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/plants" element={<PlantsPage />} />
        <Route path="/plant/:id" element={<SinglePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/myplants" element={<MyPlantPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
