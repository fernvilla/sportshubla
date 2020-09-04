export interface Team {
  id: number;
  name: string;
  shortName: string;
  websiteUrl: string;
  slug: string;
}

export interface TeamData {
  response: Team;
  isLoading: boolean;
  refetch: () => void;
}
