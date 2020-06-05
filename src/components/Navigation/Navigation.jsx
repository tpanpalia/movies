import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link
        style={{ color: "white", width: "70%", textDecoration: "none" }}
        to="/"
      >
        <h1 style={{ width: "70%" }}>Movie Reviews</h1>
      </Link>
      <ul className="nav-links">
        <Link style={{ color: "white" }} to="/search">
          <li>Search</li>
        </Link>
        <Link style={{ color: "white" }} to="/myratings">
          <li>My Ratings Page</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navigation;
