import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BudgetCategoryTable from "../BudgetCategoryTable/BudgetCategoryTable";

import "./GroupDashboard.css";
import AddExpenseForm from "../AddExpenseForm/AddExpenseForm";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";

const GroupDashboard = () => {

  const groupId = useParams();
  const dispatch = useDispatch();

  const categories = useSelector((store) => store.categories);
  const {id, name, totalBudget} = useSelector((store) => store.groups);

  // store specific budget and categories in global state based on groupId from url params
  useEffect(() => {
    id && dispatch({ type: 'FETCH_GROUP_CATEGORIES', payload: id });
  }, [ id ]);

  // console.log("New category:", newCategory);
  // console.log("New expense:", newExpense);

  return (
    <div className="main-wrapper">
      <h1>{name}</h1>
      {/* Display monthly income before tax */}
      {/* stretch: implement monthly take home based on taxes by state */}
      <h2>Monthly Income: {Math.round(totalBudget / 12)}</h2>

      {/* look up stack mui for arranging items in line */}
      <AddExpenseForm groupId={id} categories={categories} />
      <AddCategoryForm budgetId={id} groupId={groupId} />

      <section className="budgetCategories">
        {categories[0] ? (
          categories.map((item) => (
            <BudgetCategoryTable key={item.name} category={item} />
          ))
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};

export default GroupDashboard;
