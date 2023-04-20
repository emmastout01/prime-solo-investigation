const categories = (state = {}, action) => {
  switch (action.type) {
    case 'SET_GROUP_CATEGORIES':
      return action.payload;
    case 'UNSET_GROUP_CATEGORIES':
      return {};
    default:
      return state;
  }
}

export default categories;