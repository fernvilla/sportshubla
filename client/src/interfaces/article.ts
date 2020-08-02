import { NewsSource } from './newsSource';
import { FeedItem } from './feedItem';

export interface Article {
  id: number;
  title: string;
  publishedDate: string;
  url: string;
  image: string;
  clicks: number;
  author: string;
  summary: string;
  newsSource: NewsSource;
  feedItem: FeedItem;
}
