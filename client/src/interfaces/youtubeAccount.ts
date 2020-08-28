import { Team } from './team';

export interface YoutubeAccount {
  id: number;
  channelId: string;
  team?: Team;
}
