
import { IS_AUTH, GET_LOGIN, REQUEST_FETCH_TOLOGIN, RECEIVE_FETCH_TOLOGIN, REQUEST_FETCH_TOSIGNUP, RECEIVE_FETCH_TOSIGNUP,
   CHANGE_MODAL, ADD_ACCOUNT_HESHTEGS ,  SAVE_PRESENT, CHANGE_PRESENT, USER_NAME, 
   USER_MIDDLE_NAME,USER_FAMILY_NAME,USER_EMAIL,USER_INFO, REQUEST_FETCH_TOCHANGEINFO, RECEIVE_FETCH_TOCHANGEINFO} from "./action-types";

export const isAuth = (payload) => {
  return {
      type: IS_AUTH,
      isAuth: payload
  }
};

export const getLogin = (payload) => {
  return {
      type: GET_LOGIN,
      login: payload
  }
};

export const requestFetchToLogin = (data) => {
  return { type: REQUEST_FETCH_TOLOGIN, data };
};

export const receiveFetchToLogin = data => {
  return { type: RECEIVE_FETCH_TOLOGIN, auth: data.auth, err: data.err, accountHeshtegs: data.user.heshtegs, presents: data.user.presents, user: data.user
   };
};

export const requestFetchToSignUp = (data) => {
  return { type: REQUEST_FETCH_TOSIGNUP, data };
};

export const receiveFetchToSignUp = data => {
  return { type: RECEIVE_FETCH_TOSIGNUP, auth: data.auth, err: data.err
   };
};

export const changeModal = (payload) => {
  return {
      type: CHANGE_MODAL,
      isOpen: payload
  }
};

export const addHeshtegs = (payload) => {
  return {
      type: ADD_ACCOUNT_HESHTEGS,
      heshtegs: payload
  }
};

export const savePresent = (payload) => {
  return {
      type: SAVE_PRESENT,
      present: payload
  }
};

export const changePresent = (payload) => {
  return {
      type: CHANGE_PRESENT,
      presents: payload
  }
};
export const userName = (payload) => {
  return {
      type: USER_NAME,
      userName: payload
  }
};
export const userMiddleName = (payload) => {
  return {
      type: USER_MIDDLE_NAME,
      userMiddleName: payload
  }
};
export const userFamilyName = (payload) => {
  return {
      type: USER_FAMILY_NAME,
      userFamilyName: payload
  }
};
export const userEmail = (payload) => {
  return {
      type: USER_EMAIL,
      userEmail: payload
  }
};
export const userInfo = (payload) => {
  return {
      type: USER_INFO,
      userInfo: payload
  }
};

export const requestFetchToChangeInfo = (data) => {
  return { type: REQUEST_FETCH_TOCHANGEINFO, data };
};

export const receiveFetchToChangeInfo = data => {
  return { type: RECEIVE_FETCH_TOCHANGEINFO, data
   };
};
