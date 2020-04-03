import {
  IS_AUTH,
  GET_LOGIN,
  RECEIVE_FETCH_TOLOGIN,
  RECEIVE_FETCH_TOSIGNUP,
  CHANGE_MODAL,
  ADD_ACCOUNT_HESHTEGS,
  USER_NAME,
  USER_MIDDLE_NAME,
  USER_FAMILY_NAME,
  USER_EMAIL,
  USER_INFO
} from './action-types';

const initialUserState = {
  auth: false,
  login: '',
  error: '',
  isModalOpen: false,
  accountHeshtegs: [],
  userName:'Imya',
  userFamilyName: 'Familiya',
  userMiddleName: 'Otchestvo',
  userEmail:"email@yaya",
  userInfo:"BLABLA"

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
      case USER_NAME:
      return {
        ...state,
        userName: action.userName
      }; 
      case USER_MIDDLE_NAME:
      return {
        ...state,
        userMiddleName: action.userMiddleName
      }; 
      case USER_FAMILY_NAME:
      return {
        ...state,
        userFamilyName: action.userFamilyName
      }; 
      case USER_EMAIL:
      return {
        ...state,
        userEmail: action.userEmail
      }; 
      case USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo
      }; 


    default:
      return state;
  }
};
