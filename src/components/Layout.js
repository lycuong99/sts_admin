import React from "react";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import { Icon, SwipeableDrawer } from "@material-ui/core";
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import ProfileIcon from "@material-ui/icons/Person";
import StatisticalIcon from "@material-ui/icons/BarChart";
import Logout from "./auth/Logout";


const drawerWidth = 223;
const appBarHeight = '5em';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    height: appBarHeight,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  sidebarItem:{
    margin: 8,
      padding: "6px 8px",
      display: 'flex',
      alignItems:'center',
      height:52,
     
  },
  sidebarItemIcon:{
    fontSize: 18,
    marginRight:8,
    width:20,
    height:20,
   
  },
  sidebarItemText:{
    lineHeight:16
  }
}));

const INIT_DATA = {
  path: ["/user", "/company", "/profile", "/statistical"],
  name: ["All User", "Company", "Profile", "Statistical"],
  icon: [<GroupOutlinedIcon />, <BusinessOutlinedIcon />,<ProfileIcon />,<StatisticalIcon />]
};

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
        color="primary"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap >
            Web admin
          </Typography>
        </Toolbar>
      </AppBar>

        
      <SwipeableDrawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {INIT_DATA.name.map((text, index) => (
            <ListItem button key={text} className={classes.sidebarItem} component={NavLink} to={INIT_DATA.path[index]}
            activeStyle={{
              fontWeight: "bold",
              color: "blue"
            }}>
              <span><Icon className={classes.sidebarItemIcon}>{INIT_DATA.icon[index]}</Icon> </span> 
              <span>{text}</span>
              {/* <ListItemText primary={text}  className={classes.sidebarItemIconText}/> */}
              {/* link để ở đây nè */}
              {/* <NavLink to={ INIT_DATA.path[index]}
                activeClassName="active"
                key={index} /> */}
            </ListItem>
          ))}
        </List>
        <Divider />
        <Logout/>
      </SwipeableDrawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>

    </div>
  );
}
