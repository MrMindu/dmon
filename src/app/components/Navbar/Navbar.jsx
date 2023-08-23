"use client";

import "./Navbar.css";
import React from "react";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { GiRocketThruster } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./constants";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const pathname = usePathname();

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
            {navItems.map(({ label, href }) => {
              const isActive = pathname === href;
              const liClassName = `nav-links` + (isActive ? ` activated` : ``);

              return (
                <li key={label} className="nav-item">
                  <Link href={href} onClick={closeMobileMenu}>
                    <p className={liClassName}>
                      {label}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </IconContext.Provider>
  );
};

export default Navbar;
