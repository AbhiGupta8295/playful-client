import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Reset() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const options = [
    { value: "option1", label: "What is your pet name?" },
    { value: "option2", label: "What is your favourite color?" },
    { value: "option3", label: "which place do you like to visit the most?" },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleResetClick = async (event) => {
    event.preventDefault();
    try {
      const credentials = { username, selectedOption, answer, password };
    //   console.log(credentials);
      if (!username) {
        throw Error("username is required");
      }
      if (!selectedOption) {
        throw Error("selection is required");
      }
      if (!answer) {
        throw Error("answer is required");
      }
      if (!password) {
        throw Error("new password is required");
      }
      const request = await axios.post(
        "/users/reset",
        credentials
      );

      if (request.data === true) {
        alert("Your password has been reset");
        navigate("/login");
      } 
      else {
        window.confirm("User does not exists...", navigate("/signup"));
      }
    } catch (error) {
      console.error("user does not exists", error);
    }
  };

  return (
    <>
      <h2>Enter details</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
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

      <label>
        Enter new password:
        <input type="text" value={password} onChange={handlePasswordChange} />
      </label>

      <button onClick={handleResetClick}>Reset</button>
    </>
  );
}

export default Reset;
