import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Button, Stack } from "@mui/material";
import BudgetCategoryTable from "../BudgetCategoryTable/BudgetCategoryTable";
import AddExpenseForm from "../AddExpenseForm/AddExpenseForm";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";
import { useHistory } from "react-router-dom";

import "./GroupDashboard.css";

const GroupDashboard = () => {
  const groupId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const categories = useSelector((store) => store.categories);
  const currentGroup = useSelector((store) => store.currentGroup);

  // store specific budget and categories in global state based on groupId from url params
  useEffect(() => {
    currentGroup.id &&
      dispatch({ type: "FETCH_GROUP_CATEGORIES", payload: currentGroup.id });
    currentGroup.id &&
      dispatch({ type: "FETCH_ALL_GROUP_EXPENSES", payload: currentGroup.id });
    currentGroup.id &&
      dispatch({ type: "FETCH_CATEGORY_TOTALS", payload: currentGroup.id });
    dispatch({ type: "FETCH_CURRENT_GROUP", payload: groupId });
  }, [currentGroup.id]);

  // console.log("New category:", newCategory);
  // console.log("New expense:", newExpense);

  const deleteAllExpenses = () => {
    dispatch({ type: "DELETE_ALL_EXPENSES", payload: currentGroup.id });
  };

  return (
    <div className="main-wrapper">
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ height: "40px", marginBottom: "40px" }}
      >
        <h1>{currentGroup.name}</h1>
        <Button
          variant="contained"
          onClick={() => history.push(`/allExpenses/${groupId.id}`)}
        >
          All Expenses
        </Button>
      </Stack>
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
            categories.map((category) => (
              <BudgetCategoryTable key={category.id} category={category} />
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
