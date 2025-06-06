import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_ASSEMBLY_AI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "NEXT_PUBLIC_ASSEMBLY_AI_API_KEY environment variable is not set"
      );
    }

    const { audioFileUrl } = await req.json();

    const client = new AssemblyAI({
      apiKey,
    });

    const params = {
      audio_url: audioFileUrl,
      speech_model: "universal" as const,
    };

    const transcript = await client.transcripts.transcribe(params);

    return NextResponse.json({ result: transcript.words });
  } catch (e) {
    console.error("Error generating caption:", e);
    return NextResponse.json(
      {
        error: "Failed to generate caption",
        details: e instanceof Error ? e.message : String(e),
      },
      { status: 500 }
    );
  }
}
