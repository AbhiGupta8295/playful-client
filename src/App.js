// import axios from 'axios';
import { React, useContext } from 'react';
// import Intro from './views/Intro.jsx';
import AllSongs from './views/AllSongs.jsx';
import About from './views/About.jsx';
import SignupForm from './views/SignupForm.jsx';
import Login from './views/Login.jsx'
import Main from './views/Main.jsx';
import Reset from './views/Reset.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./js/AuthContext";
// import Player from './components/Player.jsx';

function App() {

  const {token } = useContext(AuthContext);

  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<About />} />
        <Route exact path="/signup" element={<SignupForm />} />
        <Route exact path="/login" element={<Login />} />

        <Route exact path="/reset" element={<Reset />} />
        {token && (
          <>
            <Route exact path="/main" element={<Main />} />
            <Route exact path="/music-stream" element={<AllSongs />} />
          </>
        )}
        {!token && <Route path="*" element={<Navigate to="/login" replace />} />}

      </Routes>
    </Router>
  );
}
export default App;