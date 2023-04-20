import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addNewCategory (action) {
  try {
    // console.log('action.payload from addNewCategory:',action.payload)
    yield axios.post('/api/categories', action.payload);

    // get all categories
    yield put({ type: 'FETCH_GROUP_CATEGORIES', payload: action.payload.budgetId });
  } catch (error) {
    console.log('Error in addNewCategory saga', error)
  }
}

function* fetchGroupCategories(action) {
  try {
    const response = yield axios.get(`/api/categories/${action.payload}`);
    console.log('response in fetchGroupCategories', response)
    yield put({ type: 'SET_GROUP_CATEGORIES', payload: response.data });
  } catch (error) {
    console.log('Error in fetchGroupCategories saga', error);
  }
}

function* deleteCategory(action) {
   try {
    yield axios.delete(`/api/categories/delete/${action.payload.categoryId}`);
    yield axios.delete(`/api/expenses/deleteByCategory/${action.payload.categoryId}`);
    yield put({ type: 'FETCH_GROUP_CATEGORIES', payload: action.payload.budgetId });
   } catch (error) {
    console.log('Error in deleteCategory saga', error)
   }
}

function* categorySaga() {
  yield takeLatest('ADD_NEW_CATEGORY', addNewCategory);
  yield takeLatest('FETCH_GROUP_CATEGORIES', fetchGroupCategories);
  yield takeLatest('DELETE_CATEGORY', deleteCategory);
}

export default categorySaga;