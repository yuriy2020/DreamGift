import { IS_AUTH, GET_LOGIN, REQUEST_FETCH_TOLOGIN, RECEIVE_FETCH_TOLOGIN, REQUEST_FETCH_TOSIGNUP, RECEIVE_FETCH_TOSIGNUP, CHANGE_MODAL, ADD_ACCOUNT_HESHTEGS, SAVE_PRESENT, CHANGE_PRESENT } from "./action-types";

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
  return { type: RECEIVE_FETCH_TOLOGIN, auth: data.auth, err: data.err, accountHeshtegs: data.user.heshtegs, presents: data.user.presents
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
