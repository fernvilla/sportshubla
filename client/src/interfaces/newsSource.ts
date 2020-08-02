import { Team } from './team';

export interface NewsSource {
  id: number;
  websiteUrl: string;
  slug: string;
  name: string;
  team?: Team;
}
