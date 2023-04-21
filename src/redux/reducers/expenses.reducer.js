const expenses = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_GROUP_EXPENSES':
      return action.payload;
    case 'UNSET_GROUP_EXPENSES':
      return [];
    default:
      return state;
  }
}

export default expenses;