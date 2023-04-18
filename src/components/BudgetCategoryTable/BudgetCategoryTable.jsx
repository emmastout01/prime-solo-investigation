import './BudgetCategoryTable.css'

const BudgetCategoryTable = ({ category }) => {
  return (
    <div className='category'>
      <div className="flex-row">
        <h3>{category.categoryName}</h3>
        <h3>Budget Amount: {category.budgetAmount}</h3>
      </div>
    </div>
  );
};

export default BudgetCategoryTable;
