import React from "react";
import '../css/about.css';
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate("/signup");
  };
  const handleLoginClick = () => {
    navigate('/login');
  }

  return (
    <>
      <nav>
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleStartClick}>Sign Up</button>
      </nav>
      <div>Welcome to Hompage</div>
      <button onClick={handleStartClick}>Start</button>
    </>
  );
}

export default About;
