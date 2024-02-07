"use client";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video }: { video: string }) => {
  return (
    <div>
      <ReactPlayer
        width="100%"
        height="500px"
        url={video}
        controls={true}
        light={false}
        pip={true}
      />
      <source src={video} type="video/mp4" />
    </div>
  );
};

export default VideoPlayer;
