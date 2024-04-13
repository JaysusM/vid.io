import { getSession } from "@auth0/nextjs-auth0";
import DownloadButton from "@components/download-button.component";
import ShareButton from "@components/share-button.component";
import { User, Video, type UserModel, type VideoModel } from "@models/models";
import { Button } from "@ui/button";
import { AWS } from "@utils/aws";
import Database from "@utils/db";
import { getBeautifiedDate, getDistanceDate } from "@utils/utils";
import Image from "next/image";

const getData = async (
  videoId: string
): Promise<{
  video: VideoModel & { url: string };
  author: UserModel;
  isAuthor: boolean;
  expired: boolean;
}> => {
  await Database.connect();
  const video = await Video.findById(videoId);
  const author = (await User.findById(video?.userId)) || {
    name: "Unknown",
    email: "unknown",
    picture: "",
  };
  const session = await getSession();
  const expired = video?.expiresAt && new Date() > video.expiresAt;

  if (expired) {
    return { video: video?.toObject(), author, isAuthor: false, expired };
  }

  const videoUrl = await AWS.getFile(video.key);

  return {
    video: { ...video?.toObject(), url: videoUrl },
    author,
    isAuthor: author.email === session?.user.email,
    expired: false,
  };
};
const VideoPage = async ({ params }: { params: { videoId: string } }) => {
  const { video, author, isAuthor, expired } = await getData(params.videoId);

  if (expired) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-20px)] mt-[15px]">
        <h2 className="code-font">
          This video has expired and is no longer available.
        </h2>
        <h3 className="my-3">
          Videos from unknown users are deleted after 6 hours.
        </h3>
        <Button>
          <a href="/">Go To Main Page</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-[calc(95vh-10px)] mt-[5vh]">
      <video
        src={video.url}
        controls
        className="max-w-[80%] min-w-[80%] rounded-t-xl p-[20px] bg-[#38383838]"
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
          {video.expiresAt && (
            <> | Expires At: {getBeautifiedDate(video.expiresAt)}</>
          )}
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
