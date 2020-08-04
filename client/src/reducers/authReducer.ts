import { SET_CURRENT_USER, LOGGING_IN_USER } from '../actions/types';
import { isEmpty } from '../utils/validation';
import { Auth } from '../interfaces/auth';

const initialState: Auth = {
  isAuthenticated: false,
  isLoggingIn: false,
  user: {}
};

export const auth = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case LOGGING_IN_USER:
      return {
        ...state,
        isLoggingIn: action.payload
      };

    default:
      return state;
  }
};
