import { getSession } from "@auth0/nextjs-auth0";
import VideoThumbnail from "@components/video-thumbnail.component";
import User from "@models/user";
import Video from "@models/video";
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
    <div className="flex flex-col gap-5 my-[30px] mx-[5vw] p-[20px] rounded-xl">
      <h2 className="text-3xl">My Library</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {videos.map((video, key) => (
          <VideoThumbnail
            videoId={video.id}
            videoThumbnail={video.thumbnail}
            createdAt={video.createdAt}
            key={key}
          />
        ))}
        {videos.length === 0 && <p>No videos found</p>}
      </div>
    </div>
  );
};

export default MyLibraryPage;
