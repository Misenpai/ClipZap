import { NextResponse } from "next/server";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";

export async function POST(req: Request) {
  try {
    const { text, id } = await req.json();
    const storageRef = ref(storage, "ai-short-video-files/" + id + ".mp3");

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
      {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY!,
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const uploadResult = await uploadBytes(storageRef, audioBuffer, {
      contentType: "audio/mpeg",
    });

    const downloadURL = await getDownloadURL(uploadResult.ref);

    console.log(
      `Audio content uploaded to Firebase Storage: ${uploadResult.ref.fullPath}`
    );

    return NextResponse.json({
      message: "Audio file generated and uploaded successfully",
      filename: id + ".mp3",
      downloadURL: downloadURL,
    });
  } catch (e) {
    console.error("Error generating audio:", e);
    return NextResponse.json(
      { error: "Failed to generate audio" },
      { status: 500 }
    );
  }
}
