"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type OnUserSelect = (fieldName: string, fieldValue: string) => void;

const SelectTopic = ({ onUserSelect }: { onUserSelect: OnUserSelect }) => {
  const options = [
    "Custom Prompts",
    "Random AI Story",
    "Scary Story",
    "Motivational",
    "Fun Facts",
  ];

  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  return (
    <div>
      <h2 className="font-bold text-2xl text-primary">Content</h2>
      <p className="text-gray-500">What is the topic of your video?</p>
      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          if (value !== "Custom Prompts") {
            onUserSelect("topic", value);
          }
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOption == "Custom Prompts" && (
        <Textarea
          className="mt-3 "
          onChange={(e) => onUserSelect("topic", e.target.value)}
          placeholder="Write prompt you want to generate"
        />
      )}
    </div>
  );
};

export default SelectTopic;
