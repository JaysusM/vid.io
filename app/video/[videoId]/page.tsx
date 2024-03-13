import Database from "@utils/db";
import { ObjectId } from "bson";
import Image from "next/image";

const Video = async ({ params }: { params: { videoId: string } }) => {
  const db = await Database.getInstance();

  const video = await db
    .getConnection()
    .collection("videos")
    .findOne({ _id: new ObjectId(params.videoId) });

  const user = video
    ? await db
        .getConnection()
        .collection("users")
        .findOne({ _id: new ObjectId(video.userId) })
    : null;

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
                src={user.picture}
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

export default Video;
