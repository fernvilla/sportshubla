import { League } from './league';

export interface Team {
  id: number;
  fullName: string;
  shortName?: string;
  websiteUrl?: string;
  slug: string;
  league?: League;
}
