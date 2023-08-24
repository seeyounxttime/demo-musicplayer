import React from "react";
import useMusicPlayer from "../hooks/usePlayerProvider";
import Marquee from "react-smooth-marquee";

function Header() {
  const { currentTrackName } = useMusicPlayer();
  return (
    <div className="header">
      <Marquee velocity={0.045}>{currentTrackName}</Marquee>
    </div>
  );
}

export default Header;
