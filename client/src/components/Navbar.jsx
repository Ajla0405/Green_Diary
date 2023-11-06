import logo from "../images/logo2.png";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import DropdownLogin from "./DropDownLogin";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
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
          {!isLoggedIn && (
            <li>
              <Link to="/login">
                <i className="fa-solid fa-user fa-xl" id="user-logo" />
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <DropdownLogin />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
