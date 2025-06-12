/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { VideoData } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { DatabaseVideoData } from "@/app/types/video";
import { VideoDataContext } from "@/app/_context/VideoDataContext";

interface PlayerDialogProps {
  playVideo: boolean;
  videoId?: number;
}

const PlayerDialog: React.FC<PlayerDialogProps> = ({ playVideo, videoId }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<DatabaseVideoData | undefined>();
  const [durationInFrame, setDurationInFrame] = useState<number>(100);
  const router = useRouter();

  const context = useContext(VideoDataContext);
  const setContextVideoData = context?.setVideoData;

  useEffect(() => {
    setOpenDialog(playVideo);
    if (videoId && playVideo) {
      GetVideoData();
    }
  }, [playVideo, videoId]);

  const GetVideoData = async () => {
    if (!videoId) return;

    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));
    setVideoData(result[0] as DatabaseVideoData);
  };

  const handleCancel = () => {
    if (setContextVideoData) {
      setContextVideoData({});
    }
    router.replace("/dashboard");
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-white flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your video is ready
          </DialogTitle>
          <DialogDescription>
            {videoData && (
              <Player
                component={RemotionVideo}
                durationInFrames={Number(durationInFrame.toFixed(0))}
                compositionWidth={300}
                compositionHeight={450}
                fps={30}
                controls={true}
                inputProps={{
                  ...videoData,
                  setDurationInFrame: (frameValue: number) =>
                    setDurationInFrame(frameValue),
                }}
              />
            )}
            <div className="flex gap-10 mt-10">
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
