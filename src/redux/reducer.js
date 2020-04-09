import {
  IS_AUTH,
  GET_LOGIN,
  RECEIVE_FETCH_TOLOGIN,
  RECEIVE_FETCH_TOSIGNUP,
  CHANGE_MODAL,
  ADD_ACCOUNT_HESHTEGS,
  SAVE_PRESENT,
  CHANGE_PRESENT,
  USER_NAME,
  USER_MIDDLE_NAME,
  USER_FAMILY_NAME,
  USER_EMAIL,
  USER_INFO,
  RECEIVE_FETCH_TOCHANGEINFO,
  USER_AVATAR,
  USER_DATES,
  USER_BIRTHDATE
} from './action-types';
import { act } from 'react-dom/test-utils';

const initialUserState = {
  auth: false,
  login: '',
  error: '',
  isModalOpen: false,
  accountHeshtegs: [],
  presents: [],
  userName: '',
  userFamilyName: '',
  userMiddleName: '',
  userEmail: '',
  userInfo: '',
  userAvatar:'',
  friends: [],
  userDates:[],
  userBirthdate: '',
};

export const reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case IS_AUTH:
      return {
        ...state,
        auth: action.isAuth,
      };
    case GET_LOGIN:
      return {
        ...state,
        login: action.login,
      };
    case RECEIVE_FETCH_TOLOGIN:
      return {
        ...state,
        auth: action.auth,
        error: action.err,
        accountHeshtegs: action.user.accountHeshtegs,
        presents: action.user.presents,
        userName: action.user.userName,
        userFamilyName: action.user.userFamilyName,
        userMiddleName: action.user.userMiddleName,
        userEmail: action.user.userEmail,
        userInfo: action.user.userInfo,
        userAvatar: action.user.userAvatar,
        userBirthdate: action.user.userBirthdate
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
        isModalOpen: action.isOpen,
      };
    case ADD_ACCOUNT_HESHTEGS:
      return {
        ...state,
        accountHeshtegs: action.heshtegs,
      };
    case USER_NAME:
      return {
        ...state,
        userName: action.userName,
      };
    case USER_MIDDLE_NAME:
      return {
        ...state,
        userMiddleName: action.userMiddleName,
      };
    case USER_FAMILY_NAME:
      return {
        ...state,
        userFamilyName: action.userFamilyName,
      };
    case SAVE_PRESENT:
      return {
        ...state,
        presents: [...state.presents, action.present],
      };
    case CHANGE_PRESENT:
      return {
        ...state,
        presents: action.presents,
      };
    case USER_EMAIL:
      return {
        ...state,
        userEmail: action.userEmail,
      };
    case USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case RECEIVE_FETCH_TOCHANGEINFO:
      return {
        ...state,
      };
      case USER_AVATAR:
      return {
        ...state,
        userAvatar:action.userAvatar
      };
      case USER_DATES:
      return {
        ...state,
        userDates: action.userDates,
      };
      case USER_BIRTHDATE:
      return {
        ...state,
        userBirthdate: action.userBirthdate
      };
    default:
      return state;
  }
};
