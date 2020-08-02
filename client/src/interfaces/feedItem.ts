import { Tweet } from './tweet';
import { FeedItemType } from './feedItemType';
import { Article } from './article';
import { Team } from './team';

export interface FeedItem {
  id: number;
  feedItemType: FeedItemType;
  tweet: Tweet;
  article: Article;
  team: Team;
}
