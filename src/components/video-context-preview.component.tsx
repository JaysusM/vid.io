"use client";
import { useVideoContext } from "@context/video-context.provider";

const VideoContextPreview = () => {
  const [video] = useVideoContext();

  return (
    <>
      {video && (
        <video src={video.url} controls className="max-w-[70%] min-w-[70%]" />
      )}
    </>
  );
};

export default VideoContextPreview;
