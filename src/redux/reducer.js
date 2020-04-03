import {
  IS_AUTH,
  GET_LOGIN,
  RECEIVE_FETCH_TOLOGIN,
  RECEIVE_FETCH_TOSIGNUP,
  CHANGE_MODAL,
  ADD_ACCOUNT_HESHTEGS
} from './action-types';

const initialUserState = {
  auth: false,
  login: '',
  error: '',
  isModalOpen: false,
  accountHeshtegs: []
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
        accountHeshtegs: action.accountHeshtegs
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
      case ADD_ACCOUNT_HESHTEGS:
      return {
        ...state,
        accountHeshtegs: action.heshtegs
      }; 
    default:
      return state;
  }
};
