import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to Home page </h1>
      <br />
      <br />
      <br />
      <Link to="/about">About</Link>
      <br />
      <Link to="/profile">profile</Link>
    </div>
  );
}

export default Home;
