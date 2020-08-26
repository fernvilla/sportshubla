import { RssFeed } from './rssFeed';

export interface Article {
  id: number;
  title: string;
  publishedDate: string;
  url: string;
  image: string;
  clicks: number;
  author: string;
  summary: string;
  rssFeed: RssFeed;
}
