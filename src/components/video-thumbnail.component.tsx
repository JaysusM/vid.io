"use client";
import { getDistanceDate } from "@utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PlayIcon } from "ui/icons";

interface VideoThumbnailProps {
  videoId: string;
  videoThumbnail: string;
  createdAt: string;
  key: string | number;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  videoId,
  videoThumbnail,
  createdAt,
  key,
}) => {
  const router = useRouter();

  const handleVideoClick = (id: string) => {
    router.push(`/video/${id}`);
  };

  return (
    <div key={videoId} className="flex flex-col">
      <div
        className="relative flex flex-col justify-center rounded-md shadow-md cursor-pointer"
        onClick={() => handleVideoClick(videoId)}
      >
        <img
          className="aspect-video object-cover rounded-t-xl"
          src={videoThumbnail}
          alt="video-thumbnail"
        />
        <div className="bg-[rgb(31,36,56)] py-[5px] px-[10px] rounded-b-xl">
          <p>Recorded {getDistanceDate(createdAt)}</p>
        </div>
        <div className="bg-white shadow-2xl rounded-full absolute top-[calc(50%-12px)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2">
          <PlayIcon className="w-6 h-6" size="24px" />
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
