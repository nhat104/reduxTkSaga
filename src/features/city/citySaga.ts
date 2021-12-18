import cityApi from 'api/cityApi';
import { City, ListResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { cityActions } from './citySlice';

function* fetchCityList() {
  try {
    const res: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCityListSuccess(res));
  } catch (error) {
    console.log('Fetch to city list error', error);
    yield put(cityActions.fetchCityListFailed());
  }
}

export function* citySaga() {
  yield takeLatest(cityActions.fetchCityList, fetchCityList);
}
