import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import BudgetCategoryTable from "../BudgetCategoryTable/BudgetCategoryTable";

const GroupDashboard = () => {
  const [newCategory, setNewCategory] = useState({ name: "", amount: "" });
  const [newExpense, setNewExpense] = useState({});

  const groupId = useParams();
  const dispatch = useDispatch();

  const categories = useSelector((store) => store.categories);
  const groupInfo = useSelector((store) => store.groups);

  // store specific budget and categories in global state based on groupId from url params
  useEffect(() => {
    dispatch({ type: "FETCH_GROUP_CATEGORIES", payload: groupId.id });
  }, []);

  const addNewCategory = () => {
    dispatch({ type: 'ADD_NEW_CATEGORY', payload: {...newCategory, budgetId: groupInfo.id, groupId: groupId.id} });
    setNewCategory({ name: "", amount: "" });
  }

  console.log("New category:", newCategory);

  return (
    <div className="main-wrapper">
      <h1>{groupInfo.name}</h1>
      {/* Display monthly income before tax */}
      {/* stretch: implement monthly take home based on taxes by state */}
      <h2>Monthly Income: {Math.round(groupInfo.totalBudget / 12)}</h2>

      <div className="add-expenses">
        <TextField type="text" label="Expense Amount" variant="outlined" />
        {/* select category here */}
        <Button variant="contained">Add Expense</Button>
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
        <Button variant="contained" onClick={addNewCategory}>Add Category</Button>
      </div>

      <section className="budgetCategories">
        {categories[0] ? (
          categories.map((item) => (
            <BudgetCategoryTable key={item.categoryName} category={item} />
          ))
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};

export default GroupDashboard;
