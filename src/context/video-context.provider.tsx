import React, { createContext, useContext, useState } from "react";

type VideoContextType = {
  file: Blob;
  url: string;
  name: string;
  id?: string;
};

const VideoContext = createContext<
  | [
      VideoContextType | undefined,
      React.Dispatch<React.SetStateAction<VideoContextType | undefined>>
    ]
>([undefined, () => {}]);

const VideoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [video, setVideo] = useState<VideoContextType>();

  return (
    <VideoContext.Provider value={[video, setVideo]}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);

export default VideoProvider;
