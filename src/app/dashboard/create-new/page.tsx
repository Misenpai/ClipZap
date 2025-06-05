"use client";

import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";

const CreateNew = () => {
  const [formData, setFormData] = useState<
    Record<string, string | number | boolean>
  >({});

  const onHandleInputChange = (
    fieldName: string,
    fieldValue: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
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
        <Button className="mt-10 w-full">Create Short Video</Button>
      </div>
    </div>
  );
};

export default CreateNew;
