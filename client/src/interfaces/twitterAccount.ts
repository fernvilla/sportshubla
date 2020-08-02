import { Team } from './team';

export interface TwitterAccount {
  id: number;
  account: string;
  team?: Team;
}
