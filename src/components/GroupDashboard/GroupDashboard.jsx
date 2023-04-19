import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import BudgetCategoryTable from "../BudgetCategoryTable/BudgetCategoryTable";

import "./GroupDashboard.css";

const GroupDashboard = () => {
  const [newCategory, setNewCategory] = useState({ name: "", amount: "" });
  const [newExpense, setNewExpense] = useState({
    name: "",
    categoryName: "",
    amount: "",
  });

  const handleChange = (category) => {
    setNewExpense({
      ...newExpense,
      categoryName: category.name,
      categoryId: category.id
    });
  };

  const groupId = useParams();
  const dispatch = useDispatch();

  const categories = useSelector((store) => store.categories);
  const groupInfo = useSelector((store) => store.groups);

  // store specific budget and categories in global state based on groupId from url params
  useEffect(() => {
    groupInfo.id && dispatch({ type: 'FETCH_GROUP_CATEGORIES', payload: groupInfo.id });
  }, [groupInfo]);

  const addNewCategory = () => {
    dispatch({
      type: "ADD_NEW_CATEGORY",
      payload: { ...newCategory, budgetId: groupInfo.id, groupId: groupId.id },
    });
    setNewCategory({ name: "", amount: "" });
  };

  const addExpense = () => {
    let expensePayload = { ...newExpense, budgetId: groupInfo.id };
    dispatch({ type: "ADD_NEW_EXPENSE", payload: expensePayload });
    setNewExpense({ name: "", categoryName: "", amount: "" });
  };

  // console.log("New category:", newCategory);
  // console.log("New expense:", newExpense);

  return (
    <div className="main-wrapper">
      <h1>{groupInfo.name}</h1>
      {/* Display monthly income before tax */}
      {/* stretch: implement monthly take home based on taxes by state */}
      <h2>Monthly Income: {Math.round(groupInfo.totalBudget / 12)}</h2>

      {/* look up stack mui for arranging items in line */}
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
      <div className="add-category">
        <TextField
          type="text"
          label="Category"
          variant="outlined"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        <TextField
          type="number"
          label="Amount"
          variant="outlined"
          value={newCategory.amount}
          onChange={(e) =>
            setNewCategory({ ...newCategory, amount: e.target.value })
          }
        />
        <Button variant="contained" onClick={addNewCategory}>
          Add Category
        </Button>
      </div>

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
