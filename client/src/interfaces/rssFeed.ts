import { Team } from './team';
import { NewsSource } from './newsSource';

export interface RssFeed {
  id: number;
  url: string;
  isActive: boolean;
  lastStatusCode: number;
  team?: Team;
  newsSource?: NewsSource;
}
