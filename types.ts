
export interface PoemData {
  title: string;
  content: string[];
  author: string;
}

export interface ArtPiece {
  id: string;
  poem: PoemData;
  imageUrl: string;
  timestamp: number;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING_POEM = 'GENERATING_POEM',
  GENERATING_IMAGE = 'GENERATING_IMAGE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
