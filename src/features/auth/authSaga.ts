import { call, fork, take, delay, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  loginFailed,
  LoginPayload,
  loginRequest,
  loginSuccess,
  logout,
} from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(500);
    localStorage.setItem('access_token', 'fake_token');
    yield put(
      loginSuccess({
        id: 1,
        name: 'Nhat',
      })
    );
    // redirect to admin page
  } catch (error) {
    yield put(loginFailed());
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  // redirect to login page
}

function* watchLoginFlow() {
  while (1) {
    const isLoggedIn = localStorage.getItem('access_token');
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(loginRequest.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
