
// импорт обязательно из redux-saga/effects, а не просто redux-saga
import { call, put, takeLatest } from "redux-saga/effects";
import { REQUEST_FETCH_TOLOGIN, REQUEST_FETCH_TOSIGNUP } from "../action-types";
import { receiveFetchToLogin, receiveFetchToSignUp } from "../actions";
import { fetchToLogin } from "../../utils/fetchToLogin";
import { fetchToSignUp } from "../../utils/fetchToSignUp";

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

// работает по принципу - увидел action REQUEST_FETCH запускаю функцию fetchSaga
export default function* actionWatcher() {
  yield takeLatest(REQUEST_FETCH_TOLOGIN, fetchSagaLogin);
  yield takeLatest(REQUEST_FETCH_TOSIGNUP, fetchSagaSignUp);
}
