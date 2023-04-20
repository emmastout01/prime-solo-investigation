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
  const groupInfo = useSelector((store) => store.groups);

  const { id, name, totalBudget } = useSelector((store) => store.groups);

  // store specific budget and categories in global state based on groupId from url params
  useEffect(() => {
    id && dispatch({ type: "FETCH_GROUP_CATEGORIES", payload: id });
  }, [id]);

  // console.log("New category:", newCategory);
  // console.log("New expense:", newExpense);

  const deleteAllExpenses = () => {
    dispatch({ type: 'DELETE_ALL_EXPENSES', payload: groupInfo.id });
  }

  return (
    <div className="main-wrapper">
      <h1>{name}</h1>
      {/* Display monthly income before tax */}
      {/* stretch: implement monthly take home based on taxes by state */}
      <h2>Monthly Income: {Math.round(totalBudget / 12)}</h2>

      {/* look up stack mui for arranging items in line */}
      <AddExpenseForm groupId={id} categories={categories} />
      <AddCategoryForm budgetId={id} groupId={groupId} />
      <Button variant="contained" onClick={deleteAllExpenses}>Reset Expenses</Button>

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
