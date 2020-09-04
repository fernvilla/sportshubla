import { TwitterAccount } from './twitterAccount';

export default interface Tweet {
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

export interface TweetData {
  response: Tweet[];
  isLoading: boolean;
  refetch: () => void;
}
