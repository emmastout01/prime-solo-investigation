import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

const AddExpenseForm = ({ categories, groupId }) => {
  const [newExpense, setNewExpense] = useState({
    name: "",
    categoryName: "",
    amount: "",
  });

  const dispatch = useDispatch();

  const handleChange = (category) => {
    setNewExpense({
      ...newExpense,
      categoryName: category.name,
      categoryId: category.id
    });
  };

  const addExpense = () => {
    let expensePayload = { ...newExpense, budgetId: groupId };
    dispatch({ type: "ADD_NEW_EXPENSE", payload: expensePayload });
    setNewExpense({ name: "", categoryName: "", amount: "" });
  };

  return (
    <div className="add-expenses">
    <FormControl>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        variant="outlined"
        labelId="demo-simple-select-label"
        value={newExpense.categoryName}
        label="Category"
        sx={{
          width: "194px",
        }}
      >
        {categories[0] ? (
          categories.map((category) => (
            <MenuItem
              value={category.name}
              key={category.name}
              onClick={() => handleChange(category)}
            >
              {category.name}
            </MenuItem>
          ))
        ) : (
          <div></div>
        )}
      </Select>
    </FormControl>
    <TextField
      type="text"
      label="Expense"
      variant="outlined"
      value={newExpense.name}
      onChange={(e) =>
        setNewExpense({ ...newExpense, name: e.target.value })
      }
    />
    <TextField
      type="number"
      label="Expense Amount"
      variant="outlined"
      value={newExpense.amount}
      onChange={(e) =>
        setNewExpense({ ...newExpense, amount: Number(e.target.value) })
      }
    />
    <Button variant="contained" onClick={addExpense}>
      Add Expense
    </Button>
  </div>
  )
}

export default AddExpenseForm