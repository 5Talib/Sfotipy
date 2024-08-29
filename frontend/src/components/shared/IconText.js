import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function IconText({ iconName, displayText, active, targetLink }) {
  return (
    <Link to={targetLink}>
      <div className="flex gap-4 items-center cursor-pointer ">
        <Icon icon={iconName} color={active ? "white" : "#b3b3b3"} width="25" className="hover:text-white"/>
        <div
          className={`${
            active ? "text-white" : "text-[#b3b3b3]"
          } font-semibold text-sm hover:text-white`}
        >
          {displayText}
        </div>
      </div>
    </Link>
  );
}
