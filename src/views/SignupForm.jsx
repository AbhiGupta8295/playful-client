import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [answer, setAnswer] = useState("");
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAboutClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = async (event) => {
    event.preventDefault();
    try {
      const credentials = { username, password, selectedOption, answer};
      // console.log(credentials)
      if (!username) {
        throw Error("username is required");
      }
      if (!password) {
        throw Error("password is required");
      }
      if (!selectedOption) {
        throw Error("selection is required");
      }
      if (!answer) {
        throw Error("answer is required");
      }
      // console.log(credentials);
      const request = await axios.post(
        "/users/signup",
        credentials
      );
      if (request.data === true) {
        // console.log("new user");
        setIsLoggedIn(true);
        navigate("/main");
      } else {
        window.confirm(
          "User already exists. Please try with a different username or login to continue...",
          navigate("/login")
        );
      }
    } catch (error) {
      console.error("error posting credentials", error);
    }
  };

  const options = [
    { value: "option1", label: "What is your pet name?" },
    { value: "option2", label: "What is your favourite color?" },
    { value: "option3", label: "which place do you like to visit the most?" },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <nav>
        <button onClick={handleAboutClick}>About Us</button>
        <button onClick={handleLoginClick}>Login</button>
      </nav>
      <form>
        <h1>Sign Up</h1>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />

        {/* <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br /> */}

        <label>
          Password:
          <input
            type="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />

        <label>
          Security question:
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
          <br />
          {selectedOption && (
            <input
              type="text"
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
              placeholder="Type your answer here..."
            />
          )}
        </label>
        <br />
        <button onClick={handleSignupClick}>Sign Up</button>
        <button onClick={handleAboutClick}>Back to Home</button>
      </form>
    </>
  );
};

export default SignupForm;
