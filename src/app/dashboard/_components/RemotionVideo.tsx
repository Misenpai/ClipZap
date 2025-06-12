import { Caption, VideoScriptItem } from "@/app/types/video";
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface RemotionVideoProps {
  script?: VideoScriptItem[];
  imageList?: string[];
  audioFileUrl?: string;
  captions?: Caption[];
  setDurationInFrame?: (duration: number) => void; // <-- Make optional
}

const RemotionVideo: React.FC<RemotionVideoProps> = ({
  imageList,
  audioFileUrl,
  captions,
  setDurationInFrame,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const getDurationFrames = () => {
    if (!captions || captions.length === 0) return 100;
    const duration = (captions[captions.length - 1]?.end / 1000) * fps;
    if (setDurationInFrame) setDurationInFrame(duration); // <-- Check existence
    return duration;
  };

  const getCurrentCaptions = () => {
    if (!captions) return "";
    const currentTime = (frame / 30) * 1000;
    const currentCaption = captions.find(
      (word: Caption) => currentTime >= word.start && currentTime <= word.end
    );
    return currentCaption ? currentCaption.text : "";
  };

  if (!imageList || imageList.length === 0) {
    return (
      <AbsoluteFill className="bg-black">No images available</AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill className="bg-black">
      {imageList.map((item: string, index: number) => {
        const startTime = (index * getDurationFrames()) / imageList.length;
        const duration = getDurationFrames();
        const scale = (idx: number) =>
          interpolate(
            frame,
            [startTime, startTime + duration / 2, startTime + duration],
            idx % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
        return (
          <Sequence
            key={index}
            from={startTime}
            durationInFrames={getDurationFrames()}
          >
            <AbsoluteFill
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Img
                src={item}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: `scale(${scale(index)})`,
                }}
              />
              <AbsoluteFill
                style={{
                  color: "white",
                  justifyContent: "center",
                  top: undefined,
                  bottom: 50,
                  height: 150,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <h2 className="text-2xl">{getCurrentCaptions()}</h2>
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        );
      })}
      {audioFileUrl && <Audio src={audioFileUrl} />}
    </AbsoluteFill>
  );
};

export default RemotionVideo;
