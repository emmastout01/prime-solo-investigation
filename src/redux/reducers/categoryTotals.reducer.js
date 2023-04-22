const categoryTotals = (state = [], action) => {
  switch (action.type) {
    case 'SET_CATEGORY_TOTALS':
      return action.payload;
    case 'UNSET_CATEGORY_TOTALS':
      return {};
    default:
      return state;
  }
}

export default categoryTotals;