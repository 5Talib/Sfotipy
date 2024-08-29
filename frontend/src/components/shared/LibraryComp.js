import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function LibraryComp({
  active,
  title,
  id,
  thumbnail,
  addSongToPlaylist,
  targetLink,
}) {
  return (
    <Link to={targetLink}>
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => {
          if (addSongToPlaylist) {
            addSongToPlaylist(id);
          } else {
          }
        }}
      >
        <div
          className="thumbnail w-10 h-10 bg-cover bg-center rounded-md flex items-center justify-center"
          style={{
            backgroundImage: `url(${thumbnail})`,
          }}
        ></div>
        <div
          className={`${
            active ? "text-white" : "text-[#b3b3b3]"
          } font-semibold text-sm hover:text-white`}
        >
          {title}
        </div>
      </div>
    </Link>
  );
}
