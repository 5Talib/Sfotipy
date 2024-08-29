import React, { useState } from "react";
import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../components/shared/TextInput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { makeAuthenicationPOSTRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";

export default function UploadSong() {
  const [songData, setSongData] = useState({
    name: "",
    thumbnail: "",
  });
  const [uploadedSongName, setUploadedSongName] = useState();
  const [songUrl, setSongUrl] = useState();
  const navigate = useNavigate();

  const submitSong = async () => {
    const songInfo = { ...songData, track: songUrl };
    const response = await makeAuthenicationPOSTRequest(
      "/song/create",
      songInfo
    );
    // console.log(response.data);
    if (response.data.err) {
      alert("Could not create song!");
      return;
    }
    navigate("/home");
  };
  return (
    <LoggedInContainer>
      <div className="text-white text-xl font-bold">Upload Your Music</div>
      <div className="flex w-2/3 space-x-3 text-black">
        <div className="w-full ">
          <TextInput
            className={"bg-white text-black"}
            label="Name"
            placeholder="Name"
            name="name"
            value={songData.name}
            setUser={setSongData}
          />
        </div>
        <div className="w-full">
          <TextInput
            className={"bg-white text-black"}
            label="Thumbnail"
            placeholder="Thumbnail"
            name="thumbnail"
            value={songData.thumbnail}
            setUser={setSongData}
          />
        </div>
      </div>
      <div>
        {uploadedSongName ? (
          <div className="bg-white w-1/4 rounded-full p-3 font-semibold">
            {uploadedSongName.length > 27
              ? uploadedSongName.substring(0, 27) + "..."
              : uploadedSongName}
          </div>
        ) : (
          <CloudinaryUpload setName={setUploadedSongName} setUrl={setSongUrl} />
        )}
      </div>
      <div
        className="bg-[#1ed760] max-w-max px-6 py-3 rounded-full font-bold cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          submitSong();
        }}
      >
        Submit Song
      </div>
    </LoggedInContainer>
  );
}
