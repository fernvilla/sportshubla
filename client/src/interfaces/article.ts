import { NewsFeed } from './newsFeed';

export default interface Article {
  id: number;
  title: string;
  publishedDate: string;
  url: string;
  image: string;
  clicks: number;
  author: string;
  summary: string;
  newsFeed: NewsFeed;
}

export interface ArticleData {
  response: Article[];
  isLoading: boolean;
  refetch: () => void;
}
