"use client";

import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { useUser } from "@clerk/nextjs";
import { db } from "@/db";
import { VideoData } from "@/db/schema";
import PlayerDialog from "../_components/PlayerDialog";
import { VideoScriptItem, ImageData, VideoDataType } from "@/app/types/video";

const CreateNew = () => {
  const [formData, setFormData] = useState<
    Record<string, string | number | boolean>
  >({});
  const [loading, setLoading] = useState<boolean>(false);
  const [videoScript, setVideoScript] = useState<VideoScriptItem[]>([]);
  const [audioFileUrl, setAudioFileUrl] = useState<string>("");
  const [captions, setCaptions] = useState<unknown[]>([]);
  const [imageList, setImageList] = useState<ImageData[]>([]);

  const context = useContext(VideoDataContext);
  if (!context) {
    throw new Error("CreateNew must be used within a VideoDataProvider");
  }
  const { videoData, setVideoData } = context;

  const { user } = useUser();
  const [playVideo, setPlayVideo] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<number | undefined>();

  const onHandleInputChange = (
    fieldName: string,
    fieldValue: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
  };

  const GetVideoScript = async () => {
    try {
      setLoading(true);
      const prompt = `Write a script to generate ${formData.duration} seconds video on topic : ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field`;

      const response = await axios.post("/api/get-video-script", {
        prompt: prompt,
      });

      console.log("Success:", response.data.result);
      setVideoData((prev: VideoDataType) => ({
        ...prev,
        videoScript: response.data.result,
      }));
      setVideoScript(response.data.result);
      GenerateAudioFile(response.data.result);
    } catch (error) {
      console.error("Error generating video script:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Server responded with:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const GenerateAudioFile = async (videoScriptData: VideoScriptItem[]) => {
    setLoading(true);
    try {
      let script = "";
      const id = uuidv4();
      videoScriptData.forEach((item) => {
        script = script + item.ContentText + " ";
      });

      const resp = await axios.post("/api/generate-audio", {
        text: script,
        id: id,
      });

      setVideoData((prev: VideoDataType) => ({
        ...prev,
        audioFileUrl: resp.data.result,
      }));
      setAudioFileUrl(resp.data.result);

      if (resp.data.result) {
        GenerateAudioCaption(resp.data.result, videoScriptData);
      }
    } catch (error) {
      console.error("Error generating audio file:", error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateAudioCaption = async (
    fileUrl: string,
    videoScriptData: VideoScriptItem[]
  ) => {
    setLoading(true);
    try {
      const resp = await axios.post("/api/generate-caption", {
        audioFileUrl: fileUrl,
      });

      setVideoData((prev: VideoDataType) => ({
        ...prev,
        captions: resp.data.result,
      }));
      setCaptions(resp.data.result);

      if (resp.data.result) {
        GenerateImage(videoScriptData);
      }
    } catch (error) {
      console.error("Error generating audio caption:", error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateImage = async (videoScriptData: VideoScriptItem[]) => {
    setLoading(true);
    try {
      const imagePromises = videoScriptData.map(async (element) => {
        try {
          const resp = await axios.post("/api/generate-image", {
            prompt: element?.imagePrompt,
          });

          if (resp.data.success) {
            return {
              base64: resp.data.image,
              firebaseUrl: resp.data.firebaseUrl,
              fileName: resp.data.fileName,
            };
          }
          return null;
        } catch (error) {
          console.error("Error generating individual image:", error);
          return null;
        }
      });

      const generatedImages = await Promise.all(imagePromises);
      const validImages = generatedImages.filter(
        (image): image is ImageData => image !== null
      );

      setVideoData((prev: VideoDataType) => ({
        ...prev,
        imageList: validImages,
      }));
      setImageList(validImages);
    } catch (error) {
      console.error("Error in GenerateImage:", error);
    } finally {
      setLoading(false);
    }
  };

  const SaveVideoData = useCallback(
    async (videoData: VideoDataType) => {
      setLoading(true);
      try {
        const imageUrls =
          videoData?.imageList?.map((img) => img.firebaseUrl) || [];

        if (!user?.primaryEmailAddress?.emailAddress) {
          throw new Error("User email not found");
        }

        const result = await db
          .insert(VideoData)
          .values({
            script: videoData?.videoScript,
            audioFileUrl: videoData?.audioFileUrl || "",
            captions: videoData?.captions,
            imageList: imageUrls,
            createdBy: user.primaryEmailAddress.emailAddress,
          })
          .returning({ id: VideoData?.id });

        setVideoId(result[0].id);
        setPlayVideo(true);
        console.log(result);
        return result;
      } catch (error) {
        console.error("Error saving video data:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  useEffect(() => {
    const hasAllRequiredData =
      videoData.videoScript &&
      videoData.audioFileUrl &&
      videoData.captions &&
      videoData.imageList;

    if (hasAllRequiredData) {
      SaveVideoData(videoData);
    }
  }, [videoData, SaveVideoData]);

  useEffect(() => {
    console.log("videoScript:", videoScript);
    console.log("audioFileUrl:", audioFileUrl);
    console.log("captions:", captions);
    console.log("imageList:", imageList);
  }, [videoScript, audioFileUrl, captions, imageList]);

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-center text-primary">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
        <CustomLoading loading={loading} />
        <PlayerDialog playVideo={playVideo} videoId={videoId} />
      </div>
    </div>
  );
};

export default CreateNew;
