import { RssFeed } from './rssFeed';

export default interface Article {
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

export interface ArticleData {
  response: Article[];
  isLoading: boolean;
  refetch: () => void;
}
