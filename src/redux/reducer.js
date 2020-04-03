import {
  IS_AUTH,
  GET_LOGIN,
  RECEIVE_FETCH_TOLOGIN,
  RECEIVE_FETCH_TOSIGNUP,
  CHANGE_MODAL
} from './action-types';

const initialUserState = {
  auth: false,
  login: '',
  error: '',
  isModalOpen: false,
};

export const reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case IS_AUTH:
      return {
        ...state,
        auth: action.isAuth
      };
    case GET_LOGIN:
      return {
        ...state,
        login: action.login
      };
    case RECEIVE_FETCH_TOLOGIN:
      return {
        ...state,
        auth: action.auth,
        error: action.err,
      };
      case RECEIVE_FETCH_TOSIGNUP:
      return {
        ...state,
        auth: action.auth,
        error: action.err,
      };
      case CHANGE_MODAL:
      return {
        ...state,
        isModalOpen: action.isOpen
      }; 
    default:
      return state;
  }
};
