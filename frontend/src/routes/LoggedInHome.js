import React, { useEffect, useLayoutEffect, useState } from "react";
import { Howl, Howler } from "howler";
import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";
import { Link, useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenicationGETRequest } from "../utils/serverHelpers";
import { Bars } from "react-loader-spinner";

export default function LoggedInHome() {
  const [allArtists, setAllArtists] = useState([]);
  const [artistPlaylists, setArtistPlaylists] = useState({});
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const getArtistData = async () => {
      const response = await makeAuthenicationGETRequest("/auth/users");
      if (response) {
        setAllArtists(response.data);
      }
    };
    getArtistData();
  }, []);
  // console.log(allArtists);

  useLayoutEffect(() => {
    const getAllArtistPlaylist = async () => {
      allArtists.forEach(async (artist) => {
        const response = await makeAuthenicationGETRequest(
          "/playlist/get/artist/" + artist._id
        );
        if (response) {
          setArtistPlaylists((prevPlaylists) => ({
            ...prevPlaylists,
            [artist._id]: response.data,
          }));
        }
      });
      setLoading(false);
    };
    if (allArtists.length > 0) {
      getAllArtistPlaylist();
    }
  }, [allArtists]);
  return (
    <LoggedInContainer curActiveScreen={"home"}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Bars color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        allArtists.map((artist) => {
          const playlists = artistPlaylists[artist._id];
          if (playlists && playlists.length > 0) {
            return (
              <PlaylistView
                key={artist._id}
                playlists={playlists}
                name={artist.firstName + " " + artist.lastName}
              />
            );
          }
          return null;
        })
      )};
    </LoggedInContainer>
  );
}

function PlaylistView({ playlists, name }) {
  return (
    <div className="text-white">
      <div className="text-white text-xl font-bold">{name} Playlists</div>
      <div className="w-full mt-3 flex space-x-3">
        {playlists.map((playlist) => (
          <Card
            title={playlist.name}
            thumbnail={playlist.thumbnail}
            id={playlist._id}
            name={name}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ title, thumbnail, id, name }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg cursor-pointer"
      onClick={() => navigate(`/playlist/get/playlist/${id}`)}
    >
      <div className="w-full h-44 mb-4">
        <img
          className="w-full h-full object-none rounded-lg"
          src={thumbnail}
          alt="label"
        />
      </div>
      <div className="text-white font-semibold mb-1">{title}</div>
      {
        <div className="text-gray-500 text-sm">{`Vibe to ${name}'s latest hits in ${title}.`}</div>
      }
    </div>
  );
}
