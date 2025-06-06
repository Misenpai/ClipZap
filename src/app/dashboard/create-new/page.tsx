"use client";

import React, { useState } from "react";
import axios from "axios";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import CustomLoading from "./_components/CustomLoading";

const CreateNew = () => {
  const [formData, setFormData] = useState<
    Record<string, string | number | boolean>
  >({});

  const [loading, setLoading] = useState<boolean>(false);
  const [videoScript, setVideoScript] = useState();

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
    } catch (error) {
      console.error("Error generating video script:", error);
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
