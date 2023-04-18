import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGroupBudget (action) {
  const response = yield axios.get(`/api/budget/${action.payload}`);
  console.log(response);
  yield put({ type: 'SET_GROUP_BUDGET', payload: response.data })
}

function* budgetSaga() {
  yield takeLatest('FETCH_GROUP_BUDGET', fetchGroupBudget);
}

export default budgetSaga