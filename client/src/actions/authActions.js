import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './types';
import axios from 'axios';

export const loginSuccess = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8000/login/success`, {
      withCredentials: true
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: res.data.user, error: null }
    });
  } catch (e) {
    dispatch({
      type: LOGIN_FAILED,
      payload: {
        user: {},
        error: 'Failed to authenticate user'
      }
    });
    return e.response;
  }
};

export const logout = () => async (dispatch) => {
  window.open('http://localhost:8000/logout', 'self');
  dispatch({
    type: LOGOUT
  });
};
