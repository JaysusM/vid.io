import { getSession } from "@auth0/nextjs-auth0";
import DownloadButton from "@components/download-button.component";
import ShareButton from "@components/share-button.component";
import { User, Video, type UserModel, type VideoModel } from "@models/models";
import { AWS } from "@utils/aws";
import Database from "@utils/db";
import { getDistanceDate } from "@utils/utils";
import Image from "next/image";

const getData = async (
  videoId: string
): Promise<{
  video: VideoModel & { url: string };
  author: UserModel;
  isAuthor: boolean;
}> => {
  await Database.connect();
  const video = await Video.findById(videoId);
  const author = await User.findById(video?.userId);
  const session = await getSession();
  const videoKey = author?.email + "/" + video?.name;
  const videoUrl = await AWS.getFile(videoKey);
  return {
    video: { ...video, url: videoUrl },
    author,
    isAuthor: author.email === session?.user.email,
  };
};
const VideoPage = async ({ params }: { params: { videoId: string } }) => {
  const { video, author, isAuthor } = await getData(params.videoId);

  return (
    <div className="flex flex-col justify-start items-center min-h-[calc(95vh-40px)] mt-[15px]">
      <video
        src={video.url}
        controls
        className="max-w-[80%] rounded-t-xl p-[20px] bg-[#38383838]"
      />
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
          {isAuthor && (
            <DownloadButton className="ml-[5px]" videoUrl={video.url} />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
