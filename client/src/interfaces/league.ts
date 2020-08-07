import { Team } from './team';

export interface League {
  id: number;
  fullName: string;
  shortName: string;
  websiteUrl: string;
  slug: string;
  teams: Array<Team>;
}
