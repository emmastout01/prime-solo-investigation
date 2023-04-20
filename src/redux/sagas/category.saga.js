import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addNewCategory (action) {
  console.log('action.payload from addNewCategory:',action.payload)
  yield axios.post('/api/categories', action.payload);
  // get all categories
  yield put({ type: 'FETCH_GROUP_CATEGORIES', payload: action.payload.budgetId });
}

function* fetchGroupCategories(action) {
  const response = yield axios.get(`/api/categories/${action.payload}`);
  console.log('response in fetchGroupCategories', response)
  yield put({ type: 'SET_GROUP_CATEGORIES', payload: response.data });
}

function* categorySaga() {
  yield takeLatest('ADD_NEW_CATEGORY', addNewCategory);
  yield takeLatest('FETCH_GROUP_CATEGORIES', fetchGroupCategories);
}

export default categorySaga;