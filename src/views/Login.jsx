import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  {AuthContext } from "../js/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setLoggedIn, setToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAboutClick = () => {
    navigate("/");
  };

  const handleSignUpClick = () => {
    const token = (localStorage.getItem('token'));
    console.log(token);
    navigate("/signup");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async (event) => {
    event.preventDefault();
    try {
      const credentials = { username, password };
      if (!username) {
        throw Error("username is required");
      }
      if (!password) {
        throw Error("password is required");
      }
      // console.log(credentials);
      const response = await axios.post(
        "/users/login",
        credentials
      );

      const token = response.data;
      // console.log(token);
      
      if (response.status === 200) {
        localStorage.setItem("token", token);
        setToken(token);
        setLoggedIn(true);
          navigate("/main");
      } else {
        alert("wrong username or password");
      }
    } catch (error) {
      window.confirm("Wrong Credentials...", navigate("/login"));
      console.error("error: ", error);
    }
  };

  const handleForgotClick = async () => {
    navigate("/reset");
  };

  return (
    <>
      <nav>
        <button onClick={handleAboutClick}>About Us</button>
        <button onClick={handleSignUpClick}>SignUp</button>
      </nav>
      <form>
        <h1>Welcome back,</h1>
        <h3>Login to continue</h3>
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
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleForgotClick}>Forgot Password?</button>
      </form>
    </>
  );
}

export default Login;
