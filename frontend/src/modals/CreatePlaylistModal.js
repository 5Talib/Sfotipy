import React, { useState } from "react";
import TextInput from "../components/shared/TextInput";
import { makeAuthenicationPOSTRequest } from "../utils/serverHelpers";

export default function CreatePlaylistModal({ closeModal }) {
  const [playlistData, setPlaylistData] = useState({
    name: "",
    thumbnail: "",
  });
  const createPlaylist = async () => {
    const response = await makeAuthenicationPOSTRequest("/playlist/create", {
      name: playlistData.name,
      thumbnail: playlistData.thumbnail,
      songs: [],
    });
    if(response.data._id){
        closeModal();
    }
  };
  return (
    <div
      className="absolute h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-[#2b2b2b] w-1/3 rounded-md p-5 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 font-semibold text-lg">Create Playlist</div>
        <div className="flex flex-col gap-3 items-center justify-center">
          <TextInput
            className={"bg-white text-black"}
            label="Name"
            placeholder="Name"
            name="name"
            value={playlistData.name}
            setUser={setPlaylistData}
          />
          <TextInput
            className={"bg-white text-black"}
            label="Thumbnail"
            placeholder="Thumbnail"
            name="thumbnail"
            value={playlistData.thumbnail}
            setUser={setPlaylistData}
          />
          <div
            className="bg-white w-1/3 text-black flex items-center justify-center py-3 rounded-lg font-bold mt-3 cursor-pointer"
            onClick={createPlaylist}
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
}
