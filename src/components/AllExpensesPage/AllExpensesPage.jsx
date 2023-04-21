import AllExpensesTable from "../AllExpensesTable/AllExpensesTable";
import { Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

const AllExpensesPage = () => {
  const groupId = useParams();
  const currentGroup = useSelector((store) => store.currentGroup);
  const history = useHistory();

  return (
    <div className="main-wrapper">
      <Stack direction="row" justifyContent="space-between">
        <h1>{currentGroup.name}</h1>
        <Button variant="contained" onClick={() => history.push(`/groupDashboard/${groupId.id}`)}>Back</Button>
      </Stack>
      <AllExpensesTable />
    </div>
  );
};

export default AllExpensesPage;
