import { InferenceClient } from "@huggingface/inference";
import { NextResponse } from "next/server";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "@/configs/FirebaseConfig";

export async function POST(req: Request) {
  try {
    const hf = new InferenceClient(
      process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY
    );

    const body = await req.json();
    const {
      prompt,
      negative_prompt = "worst quality, low quality",
      num_inference_steps = 20,
      guidance_scale = 7.5,
      width = 1024,
      height = 1024,
    } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const result = await hf.textToImage({
      model: "runwayml/stable-diffusion-v1-5",
      inputs: prompt,
      parameters: {
        negative_prompt,
        num_inference_steps,
        guidance_scale,
        width,
        height,
      },
    });

    const arrayBuffer = await result.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = `${uuidv4()}.png`;
    const storageRef = ref(storage, `ai-short-video-files/${fileName}`);

    const blob = new Blob([buffer], { type: "image/png" });

    const snapshot = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const base64Image = buffer.toString("base64");

    return NextResponse.json({
      success: true,
      image: `data:image/png;base64,${base64Image}`,
      firebaseUrl: downloadURL,
      fileName: fileName,
      storagePath: `ai-short-video-files/${fileName}`,
    });
  } catch (e) {
    console.error("Image generation error:", e);

    if (e instanceof Error && e.message?.includes("Rate limit")) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    if (e instanceof Error && e.message?.includes("Model is loading")) {
      return NextResponse.json(
        { error: "Model is loading. Please try again in a few moments." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
