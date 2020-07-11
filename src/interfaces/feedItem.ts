import { Tweet } from './tweet';
import { FeedItemType } from './feedItemType';

export interface FeedItem {
  id: number;
  feedItemType: FeedItemType;
  tweet: Tweet;
}
