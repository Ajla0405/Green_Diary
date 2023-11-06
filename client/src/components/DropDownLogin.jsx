import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

function DropdownLogin() {
  const [user, setUser] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/me", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
    } catch (error) {
      alert("Error logging out");
    }
  };
  return (
    <Dropdown>
      {user ? (
        <>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Hi {user.firstName} !
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item id="dropdown-small-1">
              <Link to="/myplants"> My Plants</Link>
            </Dropdown.Item>
            <Dropdown.Item id="dropdown-small-2">
              <Link to="/myplants"> My Calendar</Link>
            </Dropdown.Item>
            <Dropdown.Item id="dropdown-small-3">
              <Link to="/myplants"> My Diary</Link>
            </Dropdown.Item>
            <Dropdown.Item id="dropdown-small-4">
              <Link to="/profile"> My Profile</Link>
            </Dropdown.Item>
            {isLoggedIn && (
              <Dropdown.Item
                id="dropdown-small-5"
                href="#/action-3"
                onClick={handleLogout}
              >
                Log out
                <i className="fa-solid fa-right-from-bracket fa-lg"></i>
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </Dropdown>
  );
}

export default DropdownLogin;
