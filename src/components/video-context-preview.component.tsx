"use client";
import { useVideoContext } from "@context/video-context.provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VideoContextPreview = () => {
  const [video] = useVideoContext();
  const router = useRouter();

  useEffect(() => {
    if (!video) {
      router.push("/");
    }
  }, []);

  return (
    <>
      {video && (
        <video src={video.url} controls className="max-w-[70%] min-w-[70%]" />
      )}
    </>
  );
};

export default VideoContextPreview;
