import { ADD_FAVORITE_TEAM, REMOVE_FAVORITE_TEAM } from './types';
import { Team } from './../interfaces/team';

export const addFavoriteTeam = (team: Team) => ({
  type: ADD_FAVORITE_TEAM,
  payload: team
});

export const removeFavoriteTeam = (team: Team) => ({
  type: REMOVE_FAVORITE_TEAM,
  payload: team
});
