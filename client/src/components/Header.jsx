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
        <Link to="/all-post" className="nav__logo">
          <img src={Logo} alt="Navbar Logo" />
        </Link>

        {/* Navigation Menu */}
        <ul className={`nav__menu ${isNavShowing ? "show" : ""}`}>
          <li>
            <Link to="/profile/sdfsdf" onClick={closeNavHandler}>
              Mi perfil
            </Link>
          </li>
          <li>
            <Link to="/create" onClick={closeNavHandler}>
              Crear nuevo posteo
            </Link>
          </li>
          <li>
            <Link to="/my-posts" onClick={closeNavHandler}>
              Mis posteos
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={closeNavHandler}>
              Iniciar sesión
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
