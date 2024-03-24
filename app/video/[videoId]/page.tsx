import ShareButton from "@components/share-button.component";
import { User, Video } from "@models/models";
import Database from "@utils/db";
import { getDistanceDate } from "@utils/utils";
import Image from "next/image";

const VideoPage = async ({ params }: { params: { videoId: string } }) => {
  await Database.connect();
  const video = await Video.findById(params.videoId);
  const author = await User.findById(video?.userId);

  return (
    <div className="flex flex-col justify-start items-center min-h-[calc(95vh-40px)] mt-[15px]">
      {video?.url ? (
        <>
          <video
            src={video.url}
            controls
            className="max-w-[80%] rounded-t-xl p-[20px] bg-[#38383838]"
          />
          {author && (
            <div className="min-w-[80%] max-w-[80%] px-[30px] pt-[5px] pb-[20px] flex flex-row justify-start items-center bg-[#38383838] rounded-b-xl">
              <Image
                src={author.picture || "/default_avatar.jpeg"}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="ml-[10px]">
                Created by {author.name} • {getDistanceDate(video.createdAt)}
              </p>
              <div className="ml-auto">
                <ShareButton videoId={params.videoId} />
              </div>
            </div>
          )}
        </>
      ) : (
        <h1 className="text-center text-gray-700 text-2xl">Video not found</h1>
      )}
    </div>
  );
};

export default VideoPage;
