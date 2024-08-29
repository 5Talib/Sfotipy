import React from "react";
import { Icon } from "@iconify/react";
import IconText from "../components/shared/IconText";

export default function Home() {
  return (
    <div className="h-full w-full flex bg-black">
      <div className="side-panel w-1/4 h-full  p-2">
        <div className="side-panel-upper w-full h-[20%] flex flex-col gap-4 bg-[#121212] flex-grow py-5 pl-5 rounded-md mb-2">
          <div className="logo w-full flex flex-row items-center gap-1">
            <Icon
              icon="simple-icons:spotify"
              style={{ color: "white" }}
              width="25"
            />
            <div className="text-white font-semibold text-md font-sans tracking-tighter">
              Spotify
            </div>
          </div>
          <IconText iconName={"material-symbols:home"} displayText={"Home"} />
          <IconText iconName={"ion:search-outline"} displayText={"Search"} />
        </div>

        <div className="side-panel-middle w-full h-[79%] flex flex-col justify-between gap-4 bg-[#121212] flex-grow py-5 pl-5 rounded-md">
          <div className="flex items-center justify-between pr-4">
            <IconText
              iconName={"fluent:library-16-filled"}
              displayText={"Your Library"}
            />
            <Icon
              icon="material-symbols-light:add"
              style={{ color: "white" }}
              width="27"
            />
          </div>
          <div className="overflow-auto">
            <div className="playlist text-white">
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
          </div>

          <div className="flex items-center gap-5 w-2/5 border border-gray-50 rounded-full py-2 px-3">
            <Icon icon="ph:globe-bold" style={{ color: "white" }} width="25" />
            <div className="text-white">English</div>
          </div>
        </div>
      </div>

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
              <div className="text-[#b3b3b3] font-semibold hover:font-extrabold hover:text-white ">
                Sign up
              </div>
              <div className="bg-white h-2/3 px-8 rounded-full flex items-center justify-center font-semibold hover:font-extrabold">
                Log in
              </div>
            </div>
          </div>
          <div className="content p-6 flex flex-col gap-6">
            <PlaylistView />
            <PlaylistView />
            <PlaylistView />
            <PlaylistView />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaylistView({titeText,cardData}) {
  return (
    <div className="text-white">
      <div className="text-white text-xl font-bold">Spotify Playlists</div>
      <div className="w-full mt-3 flex space-x-3">
        <Card
          title={"lofi beats"}
          description={"chill beats, lofi vibes, new tracks every week"}
        />
        <Card
          title={"lofi beats"}
          description={""}
        />
        <Card
          title={"lofi beats"}
          description={"chill beats, lofi vibes, new tracks every week"}
        />
        <Card
          title={"lofi beats"}
          description={"chill beats, lofi vibes, new tracks every week"}
        />
        <Card
          title={"lofi beats"}
          description={"chill beats, lofi vibes, new tracks every week"}
        />
      </div>
    </div>
  );
}

function Card({ title, description }) {
  return (
    <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
      <div className="w-full h-44 mb-4">
        <img
          className="w-full h-full object-none rounded-lg"
          src="https://images.unsplash.com/photo-1558304970-abd589baebe5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9maXxlbnwwfHwwfHx8MA%3D%3D"
          alt="label"
        />
      </div>
      <div className="text-white font-semibold mb-1">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
}
