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
    yield action.payload.expenseIds.map(expense => {
      axios.delete(`/api/expenses/${expense}`);
    })
    yield put({ type: 'FETCH_GROUP_CATEGORIES', payload: action.payload.budgetId})
  } catch(error) {
    console.log('Error in deleteExpense saga:', error);
  }
}

function* expenseSaga() {
  yield takeLatest('ADD_NEW_EXPENSE', addNewExpense);
  yield takeLatest('DELETE_EXPENSE', deleteExpense);
}

export default expenseSaga;