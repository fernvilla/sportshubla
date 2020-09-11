import { Team } from './team';
import { NewsSource } from './newsSource';

export interface NewsFeed {
  id: number;
  url: string;
  isActive: boolean;
  lastStatusCode: number;
  team?: Team;
  newsSource?: NewsSource;
}
