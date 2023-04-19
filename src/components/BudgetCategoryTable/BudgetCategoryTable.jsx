import './BudgetCategoryTable.css'

const BudgetCategoryTable = ({ category }) => {
  return (
    <div className='category'>
      <div className="flex-row">
        <h3>{category.name}</h3>
        <h3>Budget Amount: {category.budgetAmount}</h3>
        {category.expenses.map(expense => (
          <div>
            {expense.expenseName}
            {expense.expenseAmount}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetCategoryTable;
