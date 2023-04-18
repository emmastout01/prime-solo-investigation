import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GroupDashboard = () => {
  const groupId = useParams();
  const dispatch = useDispatch();
  const budgetItems = useSelector((store) => store.budgetItems);
  const groupInfo = useSelector((store) => store.groups);

  // store specific budget and categories in global state based on groupId from url params
  useEffect(() => {
    dispatch({ type: "FETCH_GROUP_BUDGET", payload: groupId.id });
  }, []);

  return (
    <div className="main-wrapper">
      <h1>{groupInfo.name}</h1>
      {/* Display monthly income before tax */}
      {/* stretch: implement monthly take home based on taxes by state */}
      <h2>Monthly Income: {Math.round(groupInfo.totalBudget / 12)}</h2>

      <section className="budgetCategories">
        {budgetItems ? (
          budgetItems.map((item) => <>{item.categoryName}</>)
        ) : (
          <div></div>
        )}
      </section>
    </div>
  );
};

export default GroupDashboard;
