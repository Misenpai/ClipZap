"use client";

import Image from "next/image";
import React, { useState } from "react";

type OnUserSelect = (fieldName: string, fieldValue: string) => void;

const SelectStyle = ({ onUserSelect }: { onUserSelect: OnUserSelect }) => {
  const styleOptions = [
    {
      name: "Realistic",
      image: "/real.jpeg",
    },
    {
      name: "Cartoon",
      image: "/cartoon.jpeg",
    },
    {
      name: "Comic",
      image: "/comic.jpeg",
    },
    {
      name: "WaterColor",
      image: "/watercolor.jpeg",
    },
    {
      name: "Gta",
      image: "/gta.jpeg",
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500">Select your video style</p>
      <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((Item, index) => (
          <div
            key={index}
            className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl ${
              selectedOption === Item.name && "border-4 border-primary"
            }`}
          >
            <Image
              src={Item.image}
              width={100}
              height={100}
              alt="style image"
              className="h-48 object-cover rounded-lg w-full"
              onClick={() => {
                setSelectedOption(Item.name);
                onUserSelect("imageStyle", Item.name);
              }}
            />

            <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">
              {Item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
