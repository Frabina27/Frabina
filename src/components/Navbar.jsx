import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* Brand */}
        <Link to="/" className="brand">
          <span className="heart">♡</span>
          <span className="brand-text">Frabina</span>
        </Link>

        {/* Links */}
        <div className="nav-links">
          <a className="nav-link" href="#experience">Experience</a>
          <a className="nav-link" href="#projects">Projects</a>

          {/* Webring */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "8px" }}>
            <a
              href="https://cs.utdring.com/#https://frabina.com/?nav=prev"
              style={{ color: "black", textDecoration: "none", fontSize: "14px" }}
            >
              ←
            </a>
            <a
              href="https://cs.utdring.com/#https://frabina.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cs.utdring.com/icon.black.svg"
                alt="CS Webring"
                style={{ width: "18px", height: "auto", opacity: 0.8, display: "block" }}
              />
            </a>
            <a
              href="https://cs.utdring.com/#https://frabina.com/?nav=next"
              style={{ color: "black", textDecoration: "none", fontSize: "14px" }}
            >
              →
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}