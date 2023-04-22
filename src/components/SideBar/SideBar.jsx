import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideBar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const user = useSelector((store) => store.user);
  const groups = useSelector((store) => store.groups);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <div className="links">
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
              <Typography variant="h5" noWrap component="div">
                Budget App
              </Typography>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => history.push("/user")}>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => history.push("/info")}>
                  <ListItemText primary={"Info"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => history.push("/about")}>
                  <ListItemText primary={"About"} />
                </ListItemButton>
              </ListItem>

              {groups[0] &&
                groups.map((group) => (
                  <ListItem disablePadding key={group.id}>
                    <ListItemButton
                      onClick={() =>
                        history.push(`/groupDashboard/${group.groupId}`)
                      }
                    >
                      <ListItemText primary={group.name} />
                    </ListItemButton>
                  </ListItem>
                ))}

              <ListItem disablePadding>
                <ListItemButton onClick={() => history.push("/newGroup")}>
                  <ListItemText primary={"Create New Group"} />
                </ListItemButton>
              </ListItem>

              <Divider />

              <ListItem disablePadding>
                <ListItemButton onClick={() => history.push("/profile")}>
                  <ListItemText primary={user.username} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => dispatch({ type: "LOGOUT" })}>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <UserDashboard /> */}
      </Main>
    </Box>
  );
};

export default SideBar;
