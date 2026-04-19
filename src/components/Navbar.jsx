import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* Brand */}
        <Link to="/" className="brand">
          <img
            src="/bunny.png"
            alt="bunny"
            style={{
              width: "32px",
              height: "32px",
              objectFit: "contain",
              verticalAlign: "middle",
              marginBottom: "4px",
            }}
          />
          <span className="brand-text"> Frabina</span>
        </Link>

        {/* Links */}
        <div className="nav-links">
          <a className="nav-link" href="/#experience">
            Experience
          </a>
          <a className="nav-link" href="/#projects">
            Projects
          </a>
        </div>
      </div>
    </nav>
  );
}