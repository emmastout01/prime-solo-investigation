import AllExpensesTable from "../AllExpensesTable/AllExpensesTable";
import { Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import DonutChart from "../DonutChart/DonutChart";

import "./AllExpensesPage.css";

const AllExpensesPage = () => {
  const groupId = useParams();
  const currentGroup = useSelector((store) => store.currentGroup);
  const history = useHistory();

  const categoryTotals = useSelector((store) => store.categoryTotals);

  return (
    <div className="main-wrapper">
      <Stack direction="row" justifyContent="space-between">
        <h1>{currentGroup.name}</h1>
        <Button
          variant="contained"
          onClick={() => history.push(`/groupDashboard/${groupId.id}`)}
        >
          Back
        </Button>
      </Stack>
      <Stack direction="row" gap="40px">
        <Stack direction="column" sx={{ width: "70%" }}>
          <AllExpensesTable />
        </Stack>
        <Stack sx={{width: "30%"}}>
          <DonutChart categoryTotals={categoryTotals} />
        </Stack>
      </Stack>
    </div>
  );
};

export default AllExpensesPage;
