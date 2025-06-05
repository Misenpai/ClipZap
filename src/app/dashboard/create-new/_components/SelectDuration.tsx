import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type OnUserSelect = (fieldName: string, fieldValue: string) => void;

const SelectDuration = ({ onUserSelect }: { onUserSelect: OnUserSelect }) => {
  return (
    <div>
      <div className="mt-7">
        <h2 className="font-bold text-2xl text-primary">Duration</h2>
        <p className="text-gray-500">Select the duration for the video</p>
        <Select
          onValueChange={(value) => {
            onUserSelect("duration", value);
          }}
        >
          <SelectTrigger className="w-full mt-2 p-6 text-lg">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30 Seconds">30 Seconds</SelectItem>
            <SelectItem value="60 Seconds">60 Seconds</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectDuration;
