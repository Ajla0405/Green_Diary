import React from "react";
import logo from "../images/logo2.png";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
    } catch (error) {
      toast.error("Error logging out");
    }
  };
  return (
    <div id="navbar-container" className="row">
      <div id="navbar-icon" className="col-md-6">
        <Link to="/">
          <img src={logo} alt="green diary logo" />
        </Link>
      </div>
      <div id="navbar-menu" className="col-md-6">
        <ul>
          <li>
            <Link to="/plants">PLANTS</Link>
          </li>
          <li>
            <Link to="/plantIdentifier">PLANT IDENTIFIER</Link>
          </li>
          <li>
            <Link to="/aboutUs">ABOUT US</Link>
          </li>
          <li>
            {isLoggedIn ? (
              <i className="fa-solid fa-user fa-xl" id="user-logo" />
            ) : (
              <Link to="/login">
                <i className="fa-solid fa-user fa-xl" id="user-logo" />
              </Link>
            )}
          </li>
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
