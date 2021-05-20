import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>it's Home page </h1>
      <Link to="/about">About</Link>
    </div>
  );
}

export default Home;
