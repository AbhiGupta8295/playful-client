import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../js/AuthContext";

function Main() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const { loggedIn } = useContext(AuthContext);

  
  const handleMp3Click = async (event) => {
    //logic to fetch music page
    event.preventDefault();
    try {
      const token = (localStorage.getItem('token'));
      if(!token){
        alert('Session expired...');
        navigate('/')
      }
      const response = await axios.post(
        "/allsongs",
        {token}
      );
      if (response.data === true && loggedIn === true) {
        navigate("/music-stream");
      } else {
        alert("Invalid request");
        navigate('/');
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleMp4Click = () => {
    //logic to fetch video page
    // navigate("/music-stream");
  };

  const handleUserChange = (event) => {
    setUser(event.target.value); // Update user state with input value
  };

  const handleSubmit = () => {
    // event.preventDefault();
    setShowGreeting(true);
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <>
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
      {showForm && (
        <div>
          <input
            type="text"
            value={user}
            onChange={handleUserChange}
            placeholder="Hi, streamy...what should we call you? "
          />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
      {showGreeting && (
        <>
          <nav>
            <h1>Hello, {user}!</h1>
          </nav>
          <div>
            <button onClick={handleMp3Click}>Stream Music</button>
          </div>

          <div>
            <button onClick={handleMp4Click}>Stream Video</button>
          </div>
        </>
      )}
    </>
  );
}

export default Main;
