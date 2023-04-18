const budgetItems = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GROUP_BUDGET':
      return action.payload;
    case 'UNSET_GROUP_BUDGET':
      return {};
    default:
      return state;
  }
}

export default budgetItems;