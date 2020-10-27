import { ADD_FAVORITE_TEAM, REMOVE_FAVORITE_TEAM } from '../actions/types';
import { Favorites } from '../interfaces/favorites';
import { Team } from '../interfaces/team';

const initialState: Favorites = {
  teams: []
};

export const favorites = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ADD_FAVORITE_TEAM:
      return {
        ...state,
        teams: [...state.teams, action.payload]
      };

    case REMOVE_FAVORITE_TEAM:
      return {
        ...state,
        teams: state.teams.filter((team: Team) => team.id !== action.payload.id)
      };

    default:
      return state;
  }
};
