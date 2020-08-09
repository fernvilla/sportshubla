import axios from 'axios';
import setAuthToken from './../utils/auth';
import jwt_decode from 'jwt-decode';
import store from 'store';
import { SET_CURRENT_USER, LOGGING_IN_USER } from './types';
import { User } from '../interfaces/user';
import { Dispatch, AnyAction } from 'redux';
import { History } from 'history';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

// export const registeringUser = bool => ({
//   type: REGISTERING_USER,
//   isRegistering: bool
// });

export const loggingInUser = (bool: boolean) => ({
  type: LOGGING_IN_USER,
  payload: bool
});

// export const registerUser = (userData, history) => dispatch => {
//   dispatch(registeringUser(true));

//   axios
//     .post('/api/users/register', userData)
//     .then(res => {
//       const { payload } = res.data;

//       store.set('jwtToken', payload);
//       setAuthToken(payload);
//       dispatch(setCurrentUser(jwt_decode(payload)));
//       dispatch(registeringUser(false));
//       history.push('/');
//     })
//     .catch(res => {
//       dispatch(registeringUser(false));
//       toast.error(res.response.data.message, {
//         position: toast.POSITION.TOP_CENTER
//       });
//     });
// };

export const loginUser = (
  userData: User,
  history: History,
  path: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  dispatch(loggingInUser(true));

  try {
    const { data } = await axios.post('/api/users/login', userData);
    const { payload } = data;

    store.set('jwtToken', payload);
    setAuthToken(payload);
    dispatch(setCurrentUser(jwt_decode(payload)));
    dispatch(loggingInUser(false));
    history.push(path || '/');
  } catch (err) {
    console.log('login error', err);
    dispatch(loggingInUser(false));
  }
};

export const setCurrentUser = (decoded: User | {}) => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

export const logoutUser = () => (dispatch: Dispatch) => {
  store.remove('jwtToken');
  setAuthToken(null);
  dispatch(setCurrentUser({}));
};
