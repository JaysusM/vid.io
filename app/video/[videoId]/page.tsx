import { User, Video } from "@models/models";
import Database from "@utils/db";
import Image from "next/image";

const VideoPage = async ({ params }: { params: { videoId: string } }) => {
  await Database.connect();
  const video = await Video.findById(params.videoId);
  const user = await User.findById(video?.userId);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {video?.url ? (
        <>
          <h1 style={{ textAlign: "center", color: "#333", fontSize: "2em" }}>
            {video.name}
          </h1>
          <video
            src={video.url}
            controls
            style={{ maxWidth: "80%", height: "auto" }}
          />
          {user && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Image
                src={user.picture || "/default_avatar.jpeg"}
                alt="Profile"
                width={50}
                height={50}
                style={{ borderRadius: "50%" }}
              />
              <p style={{ marginTop: "10px" }}>Created by {user.name}</p>
            </div>
          )}
        </>
      ) : (
        <h1 style={{ textAlign: "center", color: "#333", fontSize: "2em" }}>
          Video not found
        </h1>
      )}
    </div>
  );
};

export default VideoPage;
