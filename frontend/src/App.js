import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import { useCookies } from "react-cookie";
import LoggedInHome from "./routes/LoggedInHome";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import songContext from "./contexts/songContext";
import { useState } from "react";
import SearchPage from "./routes/SearchPage";
import SinglePlaylist from "./routes/SinglePlaylist";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  return (
    <div className="App max-w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          // logged in
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}
          >
            <Routes>
              {/* <Route path="/" element={<div className="bg-red-300">hi</div>} /> */}
              <Route path="/" element={<LoggedInHome />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/playlist/get/playlist/:playlistId" element={<SinglePlaylist />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
