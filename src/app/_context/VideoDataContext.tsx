"use client"
import { createContext, ReactNode, useContext, useState } from "react";
import { VideoDataType } from "../types/video";


interface VideoDataContextType {
  videoData: VideoDataType;
  setVideoData: React.Dispatch<React.SetStateAction<VideoDataType>>;
}

export const VideoDataContext = createContext<VideoDataContextType | undefined>(
  undefined
);

export const VideoDataProvider = ({ children }: { children: ReactNode }) => {
  const [videoData, setVideoData] = useState<VideoDataType>({});

  return (
    <VideoDataContext.Provider value={{ videoData, setVideoData }}>
      {children}
    </VideoDataContext.Provider>
  );
};

// Custom hook for using the context
export const useVideoData = () => {
  const context = useContext(VideoDataContext);
  if (!context) {
    throw new Error("useVideoData must be used within a VideoDataProvider");
  }
  return context;
};
