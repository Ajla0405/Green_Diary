import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

function DropdownLogin() {
  const { isLoggedIn, setIsLoggedIn, userData, checkUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      checkUser();
    } catch (error) {
      alert("Error logging out");
    }
  };
  return (
    <Dropdown>
      {isLoggedIn ? (
        <>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Hi {userData.firstName} !
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item id="dropdown-small-1">
              <div>
                <Link to="/myplants"> My Plants</Link>
              </div>
            </Dropdown.Item>
            <Dropdown.Item id="dropdown-small-2">
              <Link to="/mycalendar"> My Calendar</Link>
            </Dropdown.Item>
            <Dropdown.Item id="dropdown-small-3">
              <Link to="/mydiary"> My Diary</Link>
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
