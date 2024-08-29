import React, { useEffect, useState } from "react";
import { Howl, Howler } from "howler";
import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";
import { Link, useNavigate } from "react-router-dom";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenicationGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";

export default function MyMusic() {
  const [songData, setSongData] = useState([]);
  useEffect(() => {
    // can't use async with useEffect so make helper function inside
    const getData = async () => {
      const response = await makeAuthenicationGETRequest("/song/get/mysongs");
      setSongData(response.data.data);
      //   console.log(response.data.data);
    };
    getData();
  }, []);
  return (
    <LoggedInContainer curActiveScreen={"myMusic"}>
      <div className="text-white text-xl font-bold">My Songs</div>
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
    </LoggedInContainer>
  );
}
