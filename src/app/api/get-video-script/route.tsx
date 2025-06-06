import { generateContent } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await generateContent(prompt);

    return NextResponse.json({ result: JSON.parse(result) });
  } catch (e) {
    console.error("Error in API route:", e);
    return NextResponse.json(
      { 
        error: "Failed to generate content", 
        details: e instanceof Error ? e.message : String(e) 
      },
      { status: 500 }
    );
  }
}
