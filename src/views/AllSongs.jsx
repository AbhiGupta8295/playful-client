import React, { useState } from "react";
import axios from "axios";
import "../css/AllSongs.css";
import { useNavigate } from "react-router-dom";
import Player from "../components/Player.jsx";

function AllSongs() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [activeSongId, setActiveSongId] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistorySidebar, setShowHistorySidebar] = useState(false);
  const [queue, setQueue] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  // Function to handle the search button click
  const handleSearch = async (type) => {
    try {
      // Send a GET request to the backend API with the user input as a parameter
      const response = await axios.get(
        `/allsongs/${userInput}?type=${type}`
      );
      // Set the searchResult state to the fetched data
      setSearchResult(response.data);
      // Saves search history
      setSearchHistory((prevHistory) => [userInput, ...prevHistory]);
      setActiveSongId(null);
      setShowHistorySidebar(false);
      // // console.log(response.data[0].trackid);
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };
  const handleKeySearch = async (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  // Function to handle the input field change
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (userInput.trim() !== "") {
      setShowHistorySidebar(true); // Show sidebar when there's input
    } else {
      setShowHistorySidebar(false);
    }
  };

  // Function to display display Spotify player next to each song when the "mp3" button is clicked

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const handleHistoryClick = (historyQuery) => {
    setUserInput(historyQuery);
    setShowHistorySidebar(false);
  };

  const handlePlayClick = (trackid) => {
    // setActiveSongId(trackid);
    setQueue((queue) => [...queue, trackid]);
    setShowPlayer(true);
  };

  const handleAddToQueueClick = (trackid) => {
    setQueue((queue) => [...queue, trackid]);
    // console.log(queue);
  };

  const handleShowQueue = (event) => {
    event.preventDefault();
    setShowQueue(!showQueue);
  };

  const handleClearQueue = (trackid) => {
    setQueue([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // JSX to render the component
  return (
    <>
      <div>
        <button
          onClick={() => {
            navigate("/main");
          }}
        >
          Home
        </button>
        <button onClick={handleLogout}>Logout</button>
        <h2>User Input</h2>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="type here..."
          onKeyDown={handleKeySearch}
        />
        <button type="submit" onClick={() => handleSearch("track")}>
          Search by track
        </button>
        <button type="submit" onClick={() => handleSearch("artists")}>
          Search by artist
        </button>
        <button type="submit" onClick={() => handleSearch("album")}>
          Search by album
        </button>

        {showHistorySidebar && (
          <div className="search-history-sidebar">
            <h3>Search History</h3>
            <ul>
              {searchHistory.map((query, index) => (
                <li
                  key={index}
                  onClick={() => handleHistoryClick(query)}
                  className="history-item"
                >
                  {query}
                </li>
              ))}
            </ul>
            {searchHistory.length > 0 && (
              <button onClick={clearSearchHistory}>Clear History</button>
            )}
          </div>
        )}

        {searchResult && (
          <>
            {searchResult && <p>you searched for: {userInput}</p>}

            <section className="flex">
              <div>
                <h2>Search Result</h2>
                {searchResult.map((song) => (
                  <div key={song._id}>
                    <p>Song Name: {song.track}</p>
                    {song.artists ? <p>Artist: {song.artists}</p> : null}
                    {song.album ? <p>Album: {song.album}</p> : null}
                    {song.duration ? (
                      <p>
                        Duration: {(song.duration / 60000).toFixed(2)} minutes
                      </p>
                    ) : null}
                    <button onClick={() => handlePlayClick(song.trackid)}>
                      mp3
                    </button>
                    <button onClick={() => handleAddToQueueClick(song.trackid)}>
                      Add to Queue
                    </button>
                    <br />
                    <button onClick={handleShowQueue}>Show Queue</button>

                    <button onClick={handleClearQueue}>Clear Queue</button>
                  </div>
                ))}
              </div>
              {showPlayer && (
                <div>
                  <Player queue={queue} />
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
}
export default AllSongs;
