import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addNewExpense(action) {
  try {
    yield axios.post('/api/expenses', action.payload);
    yield put({ type: 'FETCH_GROUP_CATEGORIES', payload: action.payload.budgetId})
  } catch (error) {
    console.log('Error in addNewExpense saga', error);
  }
}

function* deleteExpense(action) {
  try {
    // this is a delete request
    yield axios.post(`/api/expenses/delete`, action.payload.expenseIds);
    yield put({ type: 'FETCH_GROUP_CATEGORIES', payload: action.payload.budgetId})
  } catch(error) {
    console.log('Error in deleteExpense saga:', error);
  }
}

function* deleteAllExpenses(action) {
  try {
    yield axios.delete(`/api/expenses/deleteAll/${action.payload}`);
    yield put({ type: 'FETCH_GROUP_CATEGORIES', payload: action.payload})
  } catch(error) {
    console.log('Error in deleteAllExpenses saga:', error);
  }
}

function* expenseSaga() {
  yield takeLatest('ADD_NEW_EXPENSE', addNewExpense);
  yield takeLatest('DELETE_EXPENSE', deleteExpense);
  yield takeLatest('DELETE_ALL_EXPENSES', deleteAllExpenses);
}

export default expenseSaga;