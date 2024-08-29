import React, { useEffect, useState } from "react";
import { makeAuthenicationGETRequest } from "../utils/serverHelpers";
import LibraryComp from "../components/shared/LibraryComp";

export default function AddToPlaylistModal({ closeModal, addSongToPlaylist }) {
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenicationGETRequest("/playlist/get/me");
      setPlaylist(response.data.data);
    };
    getData();
  }, []);
  return (
    <div
      className="absolute h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-[#2b2b2b] w-1/3 rounded-md p-5 text-white h-2/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 font-semibold text-lg">Select Playlist</div>
        <div className="flex flex-col gap-3 justify-center overflow-auto p-2">
          {playlist.map((item) => {
            return (
              <LibraryComp
                key={item._id}
                title={item.name}
                thumbnail={item.thumbnail}
                id={item._id}
                addSongToPlaylist={addSongToPlaylist}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
