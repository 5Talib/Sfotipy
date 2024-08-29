import React, { useState } from "react";
import { Icon } from "@iconify/react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenicationGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

export default function SearchPage() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);

  const searchSong = async () => {
    const response = await makeAuthenicationGETRequest(
      "/song/get/songname/" + searchText
    );
    setSongData(response.data.data);
  };
  
  return (
    <LoggedInContainer curActiveScreen={"search"}>
      <div className="w-full flex flex-col gap-6">
        <div
          className={`flex items-center gap-2 w-1/3 p-3 px-5 text-sm rounded-full bg-[#2b2b2b] text-white ${
            isInputFocused ? "border border-white" : ""
          }`}
        >
          <Icon icon={"ion:search-outline"} width={24} />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-[#2b2b2b] focus:outline-none"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSong();
              }
            }}
          />
        </div>
        {searchText && (
          <div className="text-white">
            Showing search results for "
            <span className="text-bold">{searchText}</span>"
          </div>
        )}
        <div className="flex-col flex gap-2">
          {songData.map((item) => {
            return (
              <SingleSongCard
                name={item.name}
                artistName={item.artist.firstName + " " + item.artist.lastName}
                thumbnail={item.thumbnail}
                track={item.track}
                id={item._id}
                playSound={() => {}}
              />
            );
          })}
        </div>
      </div>
    </LoggedInContainer>
  );
}
