
// импорт обязательно из redux-saga/effects, а не просто redux-saga
import { call, put, takeLatest } from "redux-saga/effects";
import { REQUEST_FETCH_TOLOGIN, REQUEST_FETCH_TOSIGNUP, REQUEST_FETCH_TOCHANGEINFO } from "../action-types";
import { receiveFetchToLogin, receiveFetchToSignUp, receiveFetchToChangeInfo } from "../actions";
import { fetchToLogin } from "../../utils/fetchToLogin";
import { fetchToSignUp } from "../../utils/fetchToSignUp";
import { fetchToChangeAccountInfo } from "../../utils/fetchToChangeAccountInfo";

// важно чтобы saga была генератором
function* fetchSagaLogin(params) {
  try {
    // вызываем функцию фетча с параметрами через запятую
    const isLogin = yield call(fetchToLogin, params.data.login, params.data.password);
    
    // ВАЖНО! кладем результат в action
    yield put(receiveFetchToLogin(isLogin));
  } catch (e) {
    console.log(e);
  }
}

// важно чтобы saga была генератором
function* fetchSagaSignUp(params) {
  try {
    // вызываем функцию фетча с параметрами через запятую
    const isSignUp = yield call(fetchToSignUp, params.data.login, params.data.email, params.data.password);
    
    // ВАЖНО! кладем результат в action
    yield put(receiveFetchToSignUp(isSignUp));
  } catch (e) {
    console.log(e);
  }
}

// важно чтобы saga была генератором
function* fetchSagaChangeInfo(params) {
  try {
    // вызываем функцию фетча с параметрами через запятую
    const isChange = yield call(fetchToChangeAccountInfo, params.data.login, params.data.userName, params.data.userFamilyName, params.data.userMiddleName,
      params.data.userEmail, params.data.userInfo, params.data.userBirthdate);
    
    // ВАЖНО! кладем результат в action
    yield put(receiveFetchToChangeInfo(isChange));
  } catch (e) {
    console.log(e);
  }
}

// работает по принципу - увидел action REQUEST_FETCH запускаю функцию fetchSaga
export default function* actionWatcher() {
  yield takeLatest(REQUEST_FETCH_TOLOGIN, fetchSagaLogin);
  yield takeLatest(REQUEST_FETCH_TOSIGNUP, fetchSagaSignUp);
  yield takeLatest(REQUEST_FETCH_TOCHANGEINFO, fetchSagaChangeInfo);
}
