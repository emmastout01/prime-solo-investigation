import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Button } from "@mui/material";
import BudgetCategoryTable from "../BudgetCategoryTable/BudgetCategoryTable";
import AddExpenseForm from "../AddExpenseForm/AddExpenseForm";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";

import "./GroupDashboard.css";

const GroupDashboard = () => {
  const groupId = useParams();
  const dispatch = useDispatch();

  const categories = useSelector((store) => store.categories);
  const allGroups = useSelector((store) => store.groups);
  const currentGroup = useSelector((store) => store.currentGroup)

  const { id, name, totalBudget } = useSelector((store) => store.groups);

  // store specific budget and categories in global state based on groupId from url params
  useEffect(() => {
    currentGroup.id && dispatch({ type: "FETCH_GROUP_CATEGORIES", payload: currentGroup.id });
    dispatch({ type: 'FETCH_CURRENT_GROUP', payload: groupId })
  }, [currentGroup.id]);

  // console.log("New category:", newCategory);
  // console.log("New expense:", newExpense);

  const deleteAllExpenses = () => {
    dispatch({ type: "DELETE_ALL_EXPENSES", payload: currentGroup.id });
  };

  return (
    <div className="main-wrapper">
      <h1>{currentGroup.name}</h1>
      {/* Display monthly income before tax */}
      {/* stretch: implement monthly take home based on taxes by state */}
      <h2>Monthly Income: {Math.round(currentGroup.totalBudget / 12)}</h2>

      {/* look up stack mui for arranging items in line */}
      <AddExpenseForm groupId={currentGroup.id} categories={categories} />
      <AddCategoryForm budgetId={currentGroup.id} groupId={groupId} />
      <Button variant="contained" onClick={deleteAllExpenses}>
        Reset Expenses
      </Button>

      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {categories[0] ? (
            categories.map((item) => (
              <BudgetCategoryTable key={item.name} category={item} />
            ))
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default GroupDashboard;
