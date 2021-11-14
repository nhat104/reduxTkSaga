import { all } from 'redux-saga/effects';

function* helloSaga() {
  console.log('Hello');
}
export default function* rootSaga() {
  console.log('Root saga');
  yield all([helloSaga()]);
}
