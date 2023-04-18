import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createBudget(action) {
  try {
    // post request creating budget
    // console.log('Payload budget from saga', action.payload.budget)

    const response = yield axios.post('/api/group/createBudget', action.payload.budget);
    yield put({ type: 'CREATE_BUDGET', payload: {...action.payload.budget, id: response.data[0].id, username: action.payload.username}});
    yield put({ type: 'CREATE_CATEGORIES', payload:{id: response.data[0].id, categories: action.payload.categories}});
  } catch (error) {
    console.log('Budget post request failed', error);
  }
}

function* createGroup(action) {
  try {
    //post request creating group
    console.log(action.payload)
    // store group id in response
    // i need group id, and both user ids in group
    //action.payload.username is the name to add to group
    const groupIdResponse = yield axios.post('/api/group/createGroup', action.payload);
    const userToAddId = yield axios.get(`/api/group/user/${action.payload.username}`);
    console.log('User id response', userToAddId.data)
    console.log('Group id response:', groupIdResponse.data)

    yield put({ type: 'CREATE_USER_GROUP', payload: {groupId: groupIdResponse.data[0].id, userId: userToAddId.data[0].id }})
  } catch (error) {
    console.log('Create group request failed', error);
  }
}

function* createUserGroup(action) {
  try {
    yield axios.post('/api/group/createUserGroup', action.payload);
  } catch (error) {
    console.log('User_group post request failed', error);
  }
}

function* createCategories(action) {
  try {
    // console.log('Payload in createCategories', action.payload)
    // IS HAVING THIS AXIOS POST WITHOUT A YIELD OK?
    yield action.payload.categories.map(category => {
      axios.post('/api/group/createCategories', {category, id: action.payload.id});
    })
  } catch (error) {
    console.log('User_group post request failed', error);
  }
}

function* groupSaga() {
  // budget -> groups -> user_group -> categories
  yield takeLatest('CREATE_GROUP', createBudget);
  yield takeLatest('CREATE_BUDGET', createGroup);
  yield takeLatest('CREATE_USER_GROUP', createUserGroup);
  yield takeLatest('CREATE_CATEGORIES', createCategories);
}

export default groupSaga