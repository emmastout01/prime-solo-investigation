import { DataGrid } from "@mui/x-data-grid";
import { Grid, Stack, Button, Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllExpensesTable = () => {
  const [selections, setSelections] = useState([]);
  const dispatch = useDispatch();
  const currentGroup = useSelector((store) => store.currentGroup);

  const columns = [
    {
      field: "expenseName",
      headerName: "Expense",
      width: 150,
      editable: true,
    },
    {
      field: "expenseAmount",
      headerName: "Amount",
      width: 150,
      editable: true,
    },
    {
      field: "username",
      headerName: "User",
      type: "number",
      width: 110,
      editable: false,
    },
  ];

  // const rows = category.expenses;

  const handleDelete = () => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: { expenseIds: selections, budgetId: currentGroup.id },
    });
  };

  const handleCellEditCommit = (params) => {
    let updatedExpenseObj = {};
    if (params.field === "expenseAmount") {
      updatedExpenseObj.value = Number(params.value);
      updatedExpenseObj.columnToUpdate = "amount";
    } else if (params.field === "expenseName") {
      updatedExpenseObj.value = params.value;
      updatedExpenseObj.columnToUpdate = "name";
    }
    updatedExpenseObj.budgetId = currentGroup.id;
    updatedExpenseObj.id = params.id;
    // console.log(updatedExpenseObj);

    dispatch({ type: "UPDATE_EXPENSE", payload: updatedExpenseObj });
  };

  // const deleteCategory = () => {
  //   const deleteCategoryObj = {
  //     budgetId: currentGroup.id,
  //     categoryId: category.id,
  //   };
  //   dispatch({ type: "DELETE_CATEGORY", payload: deleteCategoryObj });
  // };

  return (
    <div>
      {/* <Grid item xs={6}>
        <Stack direction="row" justifyContent="space-between">
          <h3>TEST NAME</h3>
          <h3>Budget Amount: TEST AMOUNT</h3>
        </Stack>
        <Box sx={{ height: 400, width: "100%", marginBottom: "20px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            onSelectionModelChange={(newSelection) => {
              setSelections(newSelection);
            }}
            onCellEditCommit={(params) => handleCellEditCommit(params)}
          />
        </Box>
        <Stack direction="row" justifyContent="space-between">
          {selections[0] && (
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Stack>
      </Grid> */}
    </div>
  );
};

export default AllExpensesTable;
