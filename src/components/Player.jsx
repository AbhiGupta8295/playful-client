import React, { useState } from "react";
import "../css/Player.css";
import Spotify from "./Spotify";

function Player(props) {
  const next = props.queue;
  const [activeSongIndex, setActiveSongIndex] = useState(0); // Index of the active song
  const [playState, setPlayState] = useState(false);

  const handlePlayPause = () => {
    setPlayState(!playState);
  };

  const handleNextClick = () => {
    if (activeSongIndex < next.length - 1) {
      setActiveSongIndex(activeSongIndex + 1);
    }
  };

  const handlePreviousClick = () => {
    if (activeSongIndex > 0) {
      setActiveSongIndex(activeSongIndex - 1);
    }
  };

  const activeSong = next[activeSongIndex];

  return (
    <div className="container">
      <button onClick={handlePlayPause}>{playState ? "Pause" : "Play"}</button>
      <button onClick={handleNextClick}>Next</button>
      <button onClick={handlePreviousClick}>Previous</button>
      {playState && <Spotify songId={activeSong} />}
    </div>
  );
}

export default Player;
