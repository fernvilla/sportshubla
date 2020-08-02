import axios from 'axios';
import setAuthToken from './../utils/auth';
import jwt_decode from 'jwt-decode';
import store from 'store';
import { toast } from 'react-toastify';

import { SET_CURRENT_USER, REGISTERING_USER, LOGGING_IN_USER } from './types';

export const registeringUser = bool => ({
  type: REGISTERING_USER,
  isRegistering: bool
});

export const loggingInUser = bool => ({
  type: LOGGING_IN_USER,
  isLoggingIn: bool
});

export const registerUser = (userData, history) => dispatch => {
  dispatch(registeringUser(true));

  axios
    .post('/api/users/register', userData)
    .then(res => {
      const { payload } = res.data;

      store.set('jwtToken', payload);
      setAuthToken(payload);
      dispatch(setCurrentUser(jwt_decode(payload)));
      dispatch(registeringUser(false));
      history.push('/');
    })
    .catch(res => {
      dispatch(registeringUser(false));
      toast.error(res.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
    });
};

export const loginUser = (userData, history) => dispatch => {
  dispatch(loggingInUser(true));

  axios
    .post('/api/users/login', userData)
    .then(res => {
      const { payload } = res.data;

      store.set('jwtToken', payload);
      setAuthToken(payload);
      dispatch(setCurrentUser(jwt_decode(payload)));
      dispatch(loggingInUser(false));
      history.push('/');
    })
    .catch(res => {
      dispatch(loggingInUser(false));
      toast.error(res.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  store.remove('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
