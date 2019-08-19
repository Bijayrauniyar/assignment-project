import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: action.payload.error
      };
    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: null
      };
    }
    default:
      return state;
  }
}
