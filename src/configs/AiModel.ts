import { GoogleGenAI } from "@google/genai";

export async function generateContent(userPrompt: string) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: "application/json",
  };
  const model = "gemini-1.5-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Write a script to generate 30 seconds video on topic : Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
[
  {
    "imagePrompt": "Realistic painting of a bustling 18th-century London street, cobblestones, horse-drawn carriages, people in period clothing, a sense of energy and chaos",
    "ContentText": "Our story begins in 1780s London, a city teeming with life, but also rife with poverty and unrest.  The air hangs thick with coal smoke and the scent of brewing beer."
  },
  {
    "imagePrompt": "Realistic portrait of a young, determined woman,  dressed in simple but clean clothes, holding a quill pen and a worn book, determined expression",
    "ContentText": "Meet Mary, a young woman from humble beginnings, with an insatiable thirst for knowledge.  Denied access to formal education, she taught herself through borrowed books and late-night study."
  },
  {
    "imagePrompt": "Realistic image of a clandestine meeting in a dimly lit attic room, a group of people huddled around a table with maps and documents, secretive atmosphere",
    "ContentText": "Mary stumbled upon a secret society, dedicated to challenging the established order.  They plotted reforms, advocating for equal rights and social justice."
  },
  {
    "imagePrompt": "Realistic illustration of a dramatic scene: Mary being arrested by armed guards, surrounded by a hostile crowd",
    "ContentText": "Their activities didn't go unnoticed.  Betrayed by an informant, Mary was arrested, facing imprisonment for her radical beliefs."
  },
  {
    "imagePrompt": "Realistic painting of a courtroom scene, Mary standing defiantly before a stern judge, a packed gallery observing",
    "ContentText": "Her trial was a spectacle.  Mary, though terrified, bravely defended her ideals, refusing to recant her beliefs."
  },
  {
    "imagePrompt": "Realistic image of a cheering crowd outside a courthouse, banners and signs supporting Mary, a sense of victory and hope",
    "ContentText": "Against all odds, she was acquitted!  Her acquittal sparked a wave of support for reform across the city.  Mary became a symbol of courage and resilience."
  },
  {
    "imagePrompt": "Realistic painting of Mary, older but wiser, surrounded by people, teaching and inspiring, a sense of legacy and accomplishment",
    "ContentText": "Mary continued her fight for justice, inspiring generations to come. Her story serves as a powerful reminder that even in the face of adversity, a single voice can ignite profound change."
  }
]
\`\`\`

**Note:**  This JSON provides text and image prompts suitable for a 30-second video.  The actual video creation requires video editing software and an AI image generator (like Midjourney, Dall-E 2, Stable Diffusion) to produce the visuals based on the prompts.  The timing of each scene within the 30 seconds would need to be adjusted during the video editing process.  Consider using fast cuts and dynamic visuals to maintain viewer interest within the short timeframe.  You may need to combine or simplify some scenes to fit the 30-second limit.
`,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: userPrompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let result = "";
  for await (const chunk of response) {
    result += chunk.text;
  }

  return result;
}
