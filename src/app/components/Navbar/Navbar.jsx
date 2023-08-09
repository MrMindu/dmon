"use client";

import "./Navbar.css";
import React from "react";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { GiRocketThruster } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
// import { Link } from "react-router-dom";
import Link from "next/link";
// import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };
  const closeMobileMenu = () => {
    setClick(false);
  };

  return (
    <IconContext.Provider value={{ color: `#fff` }}>
      <nav className="navbar">
        <div className="navbar-container container">
          <Link href="/" className="navbar-logo" onClick={closeMobileMenu}>
            <GiRocketThruster className="navbar-icon" />
            Dem tests
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={click ? `nav-menu active` : `nav-menu`}>
            <li className="nav-item">
              <Link
                href="/"
                className={({ isActive }) =>
                  `nav-links` + (isActive ? ` activated` : ``)
                }
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/charts"
                className={({ isActive }) =>
                  `nav-links` + (isActive ? ` activated` : ``)
                }
                onClick={closeMobileMenu}
              >
                Charts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/PLCTelegrams"
                className={({ isActive }) =>
                  `nav-links` + (isActive ? ` activated` : ``)
                }
                onClick={closeMobileMenu}
              >
                PLC-Telegrams
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </IconContext.Provider>
  );
};

export default Navbar;
