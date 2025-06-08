import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";
import { DatabaseVideoData } from "@/app/types/video";


interface VideoListProps {
  videoList: DatabaseVideoData[];
}

const VideoList: React.FC<VideoListProps> = ({ videoList }) => {
  const [openPlayDialog, setOpenPlayDialog] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<number | undefined>();

  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {videoList?.map((video: DatabaseVideoData, index: number) => (
        <div
          key={index}
          className="cursor-pointer hover:scale-105 transition-all"
          onClick={() => {
            setOpenPlayDialog(true);
            setVideoId(video.id);
          }}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={350}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{ borderRadius: 15 }}
            inputProps={{
              ...video,
              setDurationInFrame: () => console.log("thumbnail duration set"),
            }}
          />
        </div>
      ))}
      <PlayerDialog playVideo={openPlayDialog} videoId={videoId} />
    </div>
  );
};

export default VideoList;
