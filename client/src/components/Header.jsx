import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(false); // Default: false

  const toggleNavHandler = () => {
    setIsNavShowing(!isNavShowing);
  };

  const closeNavHandler = () => {
    setIsNavShowing(false);
  };

  return (
    <nav className="nav">
      <div className="container nav__container">
        {/* Logo */}
        <Link to="/" className="nav__logo">
          <img src={Logo} alt="Navbar Logo" />
        </Link>

        {/* Navigation Menu */}
        <ul className={`nav__menu ${isNavShowing ? "show" : ""}`}>
          <li>
            <Link to="/profile/sdfsdf" onClick={closeNavHandler}>
              Andrea Taylor
            </Link>
          </li>
          <li>
            <Link to="/create" onClick={closeNavHandler}>
              Create Post
            </Link>
          </li>
          <li>
            <Link to="/authors" onClick={closeNavHandler}>
              Authors
            </Link>
          </li>
          <li>
            <Link to="/logout" onClick={closeNavHandler}>
              Logout
            </Link>
          </li>
        </ul>

        {/* Toggle Button */}
        <button className="nav__toggle-btn" onClick={toggleNavHandler}>
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
