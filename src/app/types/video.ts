export interface VideoScriptItem {
  imagePrompt: string;
  ContentText: string;
}

export interface ImageData {
  base64: string;
  firebaseUrl: string;
  fileName: string;
}

export interface Caption {
  start: number;
  end: number;
  text: string;
}

export interface VideoDataType {
  videoScript?: VideoScriptItem[];
  audioFileUrl?: string;
  captions?: Caption[];
  imageList?: ImageData[];
}

export interface DatabaseVideoData {
  id: number;
  script: VideoScriptItem[];
  audioFileUrl: string;
  captions: Caption[];
  imageList: string[];
  createdBy: string;
}
