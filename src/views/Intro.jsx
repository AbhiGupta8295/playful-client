import React from "react";
import "../css/intro.css";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

function Intro() {
  return (
    <>
      <body>
        <div className="intro__nav">
          <ul>
            Select Your Mood
            <li style={{ marginTop: "1.3rem" }} className="chevron">
              <KeyboardDoubleArrowDownIcon
                sx={{ fontSize: "3rem", color: "orange" }}
              />
            </li>
            <li>
              <a href="/">Party</a>
            </li>
            <li>
              <a href="/">Sleep</a>
            </li>
            <li>
              <a href="/">Study</a>
            </li>
            <li>
              <a href="/">Gaming</a>
            </li>
            <li>
              <a href="/">All</a>
            </li>
          </ul>
        </div>
      </body>
    </>
  );
}

export default Intro;
