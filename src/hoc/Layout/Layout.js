import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';
import { CssBaseline, AppBar, Hidden, SwipeableDrawer, Drawer, makeStyles } from '@material-ui/core';

const drawerWidth = 275;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        [theme.breakpoints.up("md")]: {
            zIndex: theme.zIndex.drawer + 1,
        },
        border: 0,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 0.5rem 1rem 0 #1a1f33",
    },
    drawer: {
        [theme.breakpoints.up("md")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        //Color for actual drawer can be set here
        width: drawerWidth,
        border: 0,
    },
    toolbar: theme.mixins.toolbar,
}));

const Layout = (props) => {


    const {
        container,
        algo,
        selectAlgo,
        diag,
        allowDiag,
        heuristic,
        changeHeuristic,
        maze,
        selectMaze,
        animMaze,
        animateMaze,
        anim,
    } = props;

    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAlgoClick = (index) => {
        selectAlgo(index);
    };

    const handleHeuristicChange = (event) => {
        changeHeuristic({ [algo]: event.target.value });
    };

    const handleMazeItemClick = (index) => {
        selectMaze(index);
    };

    const drawer = <SideDrawer algoClicked={handleAlgoClick} mazeItemClicked={handleMazeItemClick} heuristicChanged={handleHeuristicChange} />;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar drawerToggleClicked={handleDrawerToggle} />
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <SwipeableDrawer
                        container={container}
                        variant="temporary"
                        onOpen={() => {
                            setMobileOpen(true);
                        }}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </SwipeableDrawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <div className={classes.toolbar} />
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

export default Layout;