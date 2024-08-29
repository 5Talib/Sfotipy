import React, { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import songContext from "../../contexts/songContext";

export default function SingleSongCard({
  name,
  artistName,
  thumbnail,
  track,
  playSound,
  id,
}) {
  const { currentSong, setCurrentSong } = useContext(songContext);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="flex hover:bg-black hover:bg-opacity-25 rounded-lg p-3 justify-between items-center"
      onPointerOver={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => {
        setCurrentSong({ name, artistName, thumbnail, track, id });
      }}
    >
      <div className="flex">
        <div
        className="thumbnail w-12 h-12 bg-cover bg-center rounded-sm flex items-center justify-center"
        style={{
          backgroundImage: `url("${thumbnail}")`,
        }}
        >
          {isHovered && (
            <Icon
              icon="ph:play-fill"
              className="cursor-pointer"
              style={{ color: "white" }}
              width="26"
            />
          )}
        </div>
        <div className="text-white flex flex-col justify-center pl-4">
          <div className="hover:underline cursor-pointer">{name}</div>
          <div className="text-xs text-gray-400 hover:underline cursor-pointer">
            {artistName}
          </div>
        </div>
      </div>
      <div className="text-white flex items-center gap-8 pr-4">
        <div>
          {isHovered && (
            <Icon
              icon="ph:heart-light"
              className="cursor-pointer"
              style={{ color: "white" }}
              width="26"
            />
          )}
        </div>
        {/* <div className="text-sm"></div> */}
        <div className="">
          <Icon icon="tabler:dots" style={{ color: "white" }} width="26" />
        </div>
      </div>
    </div>
  );
}
