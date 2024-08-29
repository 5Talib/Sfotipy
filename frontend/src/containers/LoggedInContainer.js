import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Howl, Howler } from "howler";
import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";
import { Link, useNavigate } from "react-router-dom";
import songContext from "../contexts/songContext";
import { useRef } from "react";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import LibraryComp from "../components/shared/LibraryComp";
import { makeAuthenicationGETRequest,makeAuthenicationPOSTRequest} from "../utils/serverHelpers";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import LogoutButton from "../components/shared/Logout";

export default function LoggedInContainer({ children, curActiveScreen }) {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const navigate = useNavigate();
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed, 
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  const firstUpdate = useRef(true);

  // useEffect runs after the DOM has been painted, while useLayoutEffect runs synchronously before the DOM is painted.

  // On subsequent renders, if currentSong.track changes, the changeSound function is called to stop the previous sound and play the new one.
  useLayoutEffect(() => {
    // following 'if' will prevent useEffect from running on first render
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) {
      return;
    }
    changeSound(currentSong.track);
  }, [currentSong && currentSong.track]);

  // When the component mounts, the effect makes a GET request to fetch the user's playlists and stores them in the playlist state.
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenicationGETRequest("/playlist/get/me");
      setPlaylist(response.data.data);
    };
    getData();
  }, []);

  // FUNCTIONS

  // Navigates to a specific playlist's page using React Router's useNavigate hook.
  const navigateToLibrary = (playlistId) => {
    // navigate(`/playlist/get/playlist/${playlistId}`);
  };

  // This function adds the current song to a specified playlist by making an authenticated POST request to the server. If successful, it closes the "Add to Playlist" modal.
  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong.id;
    const payload = { playlistId, songId };
    console.log(payload);
    const response = await makeAuthenicationPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response.data._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  // This function plays the current sound if it exists. It's used when toggling between play and pause states.
  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  // Stops any currently playing sound and starts playing a new one based on the provided song source URL. It updates the soundPlayed state with the new Howl instance.
  const changeSound = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  // Pauses the currently playing sound
  const pauseSound = () => {
    soundPlayed.pause();
  };

  // Toggles between playing and pausing the current sound depending on the isPaused state.
  const togglePlayPause = () => {
    if (isPaused) {
      playSound(currentSong.track);
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-black">
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div className={`${currentSong ? "h-[90%]" : "h-full"} flex w-full`}>
        {/*  *****SIDE PANEL***** */}
        <div className="side-panel flex flex-col w-1/4 h-full  p-2">
          <div className="side-panel-upper w-full max-h-max flex flex-col gap-4 bg-[#121212] flex-grow py-5 pl-5 rounded-md mb-2">
            <div className="logo w-full flex flex-row items-center gap-1">
              <Icon
                icon="simple-icons:spotify"
                style={{ color: "white" }}
                width="25"
              />
              <div className="text-white font-semibold text-md font-sans tracking-tighter">
                Sfotipy
              </div>
            </div>
            <IconText
              iconName={"material-symbols:home"}
              displayText={"Home"}
              targetLink={"/"}
              active={curActiveScreen === "home"}
            />
            <IconText
              iconName={"ion:search-outline"}
              displayText={"Search"}
              targetLink={"/search"}
              active={curActiveScreen === "search"}
            />
            <IconText
              iconName="material-symbols:library-music-rounded"
              displayText="My Music"
              targetLink={"/myMusic"}
              active={curActiveScreen === "myMusic"}
            />
            <IconText iconName="wpf:like" displayText="Liked Songs" />
          </div>

          <div className="side-panel-middle w-full h-[69%] flex flex-col gap-7 bg-[#121212] flex-grow py-5 pl-5 rounded-md">
            <div className="flex items-center justify-between pr-4">
              <IconText
                iconName={"fluent:library-16-filled"}
                displayText={"Your Library"}
              />
              <Icon
                icon="material-symbols-light:add"
                className="text-gray-400 cursor-pointer hover:text-white"
                width="27"
                onClick={() => setCreatePlaylistModalOpen(true)}
              />
            </div>
            <div className="overflow-auto w-full">
              <div className="playlist text-white flex flex-col gap-4">
                {playlist.map((item) => {
                  return (
                    <LibraryComp
                      key={item._id}
                      title={item.name}
                      id={item._id}
                      thumbnail={item.thumbnail}
                      navigateToLibrary={navigateToLibrary}
                      targetLink={"/playlist/get/playlist/"+item._id}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 max-w-max border border-gray-50 rounded-full py-1 px-2">
              <Icon
                icon="ph:globe-bold"
                style={{ color: "white" }}
                width="20"
              />
              <div className="text-white text-sm">English</div>
            </div>
          </div>
        </div>

            {/* *******MAIN PANEL****** */}
        <div className="main-panel  w-3/4 p-2 pl-0">
          <div className="w-full bg-[#121212] h-full rounded-md overflow-auto">
            <div className="navbar h-1/10 w-full bg-black bg-opacity-20 flex items-center justify-between px-6">
              <div className="max-h-max max-w-max flex gap-2">
                <div className="bg-black rounded-full p-1">
                  <Icon
                    icon="ic:twotone-less-than"
                    style={{ color: "#b3b3b3" }}
                    width="25"
                  />
                </div>
                <div className="bg-black rounded-full p-1">
                  <Icon
                    icon="ic:twotone-greater-than"
                    style={{ color: "#b3b3b3" }}
                    width="25"
                  />
                </div>
              </div>
              <div className="buttons h-full max-w-max opacity-100 flex items-center gap-8">
                <div className="text-[#b3b3b3] font-semibold hover:font-extrabold cursor-pointer hover:text-white">
                  <Link to="/uploadSong">Upload Song</Link>
                </div>
                <div className="text-[#b3b3b3] font-semibold hover:font-extrabold cursor-pointer hover:text-white">
                  <LogoutButton/>
                </div>
                <div className="bg-white h-8 w-8 rounded-full flex items-center justify-center font-semibold cursor-pointer hover:font-extrabold">
                  TK
                </div>
              </div>
            </div>
            <div className="content p-6 flex flex-col gap-6">{children}</div>
          </div>
        </div>
      </div>
      {currentSong && (
        <div className="song-play-controller flex w-full h-[10%] bg-black text-white items-center px-4">
          <div className="left-side-controlle flex items-center w-1/4">
            <img
              src={currentSong.thumbnail}
              alt="thumbnail"
              className="h-14 w-14 rounded"
            />
            <div className="flex flex-col justify-center ml-3">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs hover:underline cursor-pointer text-gray-400">
                {currentSong.artistName}
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex justify-center ">
            <div className="controls flex gap-3 items-center">
              <Icon
                icon="ion:shuffle-outline"
                width={"25"}
                className="cursor-pointer text-gray-400 hover:text-white"
              />
              <Icon
                icon="ic:round-skip-previous"
                width={"35"}
                className="cursor-pointer text-gray-400 hover:text-white"
              />
              <Icon
                icon={isPaused ? "ph:play-circle-fill" : "ph:pause-circle-fill"}
                width={"45"}
                className="cursor-pointer"
                onClick={togglePlayPause}
              />
              <Icon
                icon="ic:round-skip-next"
                width={"35"}
                className="cursor-pointer text-gray-400 hover:text-white"
              />
              <Icon
                icon="mingcute:repeat-line"
                width={"25"}
                className="cursor-pointer text-gray-400 hover:text-white"
              />
            </div>
            <div className="progress-bar"></div>
          </div>
          <div className="w-1/4 flex items-center justify-end gap-4 mr-4">
            <Icon
              icon="ic:round-playlist-add"
              width={"30"}
              className="cursor-pointer text-gray-400 hover:text-white"
              onClick={() => setAddToPlaylistModalOpen(true)}
            />
            <Icon
              icon="ph:heart-light"
              width={"30"}
              className="cursor-pointer text-gray-400 hover:text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}
