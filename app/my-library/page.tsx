import { getSession } from "@auth0/nextjs-auth0";
import VideoThumbnail from "@components/video-thumbnail.component";
import User from "@models/user";
import Video from "@models/video";
import { Button } from "@ui/button";
import Database from "@utils/db";

const getData = async () => {
  await Database.connect();
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const user = await User.findOne({ email: session.user.email });

  if (!user) throw new Error("User not found");

  const videos = await Video.find({ userId: user.id }, null, {
    sort: { createdAt: -1 },
  });

  return { user, videos };
};
const MyLibraryPage = async () => {
  const { videos } = await getData();

  return (
    <div className="flex flex-col gap-5 mt-[calc(5vh+30px)] min-h-[calc(100vh-8vh-30px)] mb-[30px] mx-[5vw] p-[20px] rounded-xl">
      <h2 className="text-3xl">My Library</h2>
      {videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {videos.map((video, key) => (
            <VideoThumbnail
              videoId={video.id}
              videoThumbnail={video.thumbnail}
              createdAt={video.createdAt}
              key={key}
            />
          ))}
        </div>
      )}
      {videos.length === 0 && (
        <div className="flex flex-col flex-1 justify-center items-center">
          <p className="mb-3">No Videos Found</p>
          <Button className="">
            <a href="/">Record New Video</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyLibraryPage;
