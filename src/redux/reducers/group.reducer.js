const groupReducer = () => {
  switch (action.type) {
    case 'SET_GROUP_ID':
      return action.payload;
    case 'UNSET_GROUP_ID':
      return {};
    default:
      return state;
  }
}

export default groupReducer;