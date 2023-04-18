import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addNewExpense(action) {
  yield axios.post('/api/expenses', action.payload);
}

function* expenseSaga() {
  yield takeLatest('ADD_NEW_EXPENSE', addNewExpense);
}

export default expenseSaga;