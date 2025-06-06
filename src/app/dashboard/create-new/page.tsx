"use client";

import React, { useState } from "react";
import axios from "axios";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";

type VideoScriptItem = {
  imagePrompt: string;
  ContentText: string;
};

const CreateNew = () => {
  const [formData, setFormData] = useState<
    Record<string, string | number | boolean>
  >({});

  const [loading, setLoading] = useState<boolean>(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();

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
      console.log(script);
      const resp = await axios.post("/api/generate-audio", {
        text: script,
        id: id,
      });
      console.log(resp.data);
      setAudioFileUrl(resp.data.result);
    } catch (error) {
      console.error("Error generating audio file:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Server responded with:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const GenerateAudioCaption = async (fileUrl: string) => {
    setLoading(true);
    try {
      const resp = await axios.post("/api/generate-caption", {
        audioFileUrl: fileUrl,
      });
      console.log(resp.data.result);
      setCaptions(resp.data.result);
    } catch (error) {
      console.error("Error generating audio caption:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Server responded with:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-center text-primary">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        {/* Select Topic  */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Select Style  */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Duration  */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* Create Button  */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>

        <CustomLoading loading={loading} />
      </div>
    </div>
  );
};

export default CreateNew;
