import { TwitterAccount } from './twitterAccount';

export interface Tweet {
  id: number;
  twitterAccountId: number;
  text: string;
  tweetId: string;
  publishedDate: string;
  screenName: string;
  name: string;
  profileImageUrl: string;
  profileBannerUrl?: string;
  mediaUrl: string;
  twitterAccount?: TwitterAccount;
}
