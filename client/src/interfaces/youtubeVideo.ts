import { YoutubeAccount } from './youtubeAccount';

export interface YoutubeVideo {
  id: number;
  title: string;
  publishedDate: string;
  youtubeAccountId: number;
  videoId: string;
  description: string;
  thumbnail: string;
  youtubeAccount?: YoutubeAccount;
}
