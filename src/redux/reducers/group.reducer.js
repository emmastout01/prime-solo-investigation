const groups = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_GROUPS':
      return action.payload;
    case 'UNSET_USER_GROUPS':
      return {};
    default:
      return state;
  }
}

export default groups;