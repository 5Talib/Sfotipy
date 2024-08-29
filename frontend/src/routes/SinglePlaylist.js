import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenicationGETRequest } from "../utils/serverHelpers";

export default function SinglePlaylist() {
  const { playlistId } = useParams();
  const [playlistDetails, setPlaylistDetails] = useState({});

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenicationGETRequest(
        "/playlist/get/playlist/" + playlistId
      );
      setPlaylistDetails(response.data);
      // console.log(response);
    };
    getData();
    // setRefresh(!refresh);
  }, [playlistId]);

  return (
    <>
      <LoggedInContainer active={"library"}>
        {playlistDetails._id && (
          <div className="flex flex-col gap-6">
            <div className="text-white text-xl font-bold">
              {playlistDetails.name}
            </div>
            <div
              className="thumbnail w-40 h-40 bg-cover bg-center rounded-lg flex items-center justify-center"
              style={{
                backgroundImage: `url("${playlistDetails.thumbnail}")`,
              }}
            ></div>
            <div className="flex-col flex gap-2">
              {playlistDetails.songs.map((item) => {
                return (
                  <SingleSongCard
                    key={item._id}
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
        )}
      </LoggedInContainer>
    </>
  );
}
