import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addNewExpense(action) {
  yield axios.post('/api/expenses', action.payload);
}

// function* fetchAllExpenses(action) {
//   console.log('in fetchallexpenses saga');
//   const response = yield axios.get(`/api/expenses/${action.payload}`);
//   yield put({type: 'SET_GROUP_EXPENSES', payload: response.data})
// }

function* expenseSaga() {
  yield takeLatest('ADD_NEW_EXPENSE', addNewExpense);
}

export default expenseSaga;