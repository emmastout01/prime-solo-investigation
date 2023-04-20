import { Avatar, Stack, Box } from "@mui/material";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((store) => store.user);
  const groupInfo = useSelector((store) => store.groups);

  return (
    <div className="main-wrapper">
      <Stack direction="column" alignItems="center">
        <Avatar sx={{ height: 250, width: 250 }}>{user.username[0]}</Avatar>
        <h1>{user.username}</h1>
        <Box>
          <h2>{user.username}'s Groups</h2>
          {/* will need to change later to show multiple groups */}
          <p>{groupInfo.name}</p>
        </Box>
      </Stack>
    </div>
  );
};

export default UserProfile;
