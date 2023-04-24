import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Button, Stack, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import BudgetCategoryTable from "../BudgetCategoryTable/BudgetCategoryTable";
import AddExpenseForm from "../AddExpenseForm/AddExpenseForm";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";
import ActivityFeed from "../ActivityFeed/ActivtyFeed";

import "./GroupDashboard.css";

const GroupDashboard = () => {
  const groupId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const categories = useSelector((store) => store.categories);
  const currentGroup = useSelector((store) => store.currentGroup);
  const allExpenses = useSelector((store) => store.expenses);

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
        alignItems="center"
        sx={{ height: "40px", marginBottom: "40px" }}
      >
        <Typography variant="h4">{currentGroup.name}</Typography>
        <Button
          variant="contained"
          onClick={() => history.push(`/allExpenses/${groupId.id}`)}
        >
          All Expenses
        </Button>
      </Stack>
      <Stack direction="row" gap="40px">
        <Stack direction="column" width="80%">
          {/* Display monthly income before tax */}
          {/* stretch: implement monthly take home based on taxes by state */}
          <Typography variant="h5">Monthly Income: {Math.round(currentGroup.totalBudget / 12)}</Typography>

          {/* look up stack mui for arranging items in line */}
          <AddExpenseForm groupId={currentGroup.id} categories={categories} />
          <AddCategoryForm budgetId={currentGroup.id} groupId={groupId} />

          <Stack justifyContent="flex-start" width="100%" direction="row" marginBottom="20px">
            <Button variant="contained" onClick={deleteAllExpenses}>
              Reset Expenses
            </Button>
          </Stack>

          <Box>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {categories[0] ? (
                categories.map((category) => (
                  <BudgetCategoryTable key={category.id} category={category} />
                ))
              ) : (
                <></>
              )}
            </Grid>
          </Box>
        </Stack>
        <ActivityFeed allExpenses={allExpenses} />
      </Stack>
    </div>
  );
};

export default GroupDashboard;
