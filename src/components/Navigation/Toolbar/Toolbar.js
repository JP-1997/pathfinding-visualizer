import React from 'react';
import { IconButton, Typography, Button, makeStyles } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import MaterialToolbar from "@material-ui/core/Toolbar";
import PurpleSlider from '../../UI/PurpleSlider/PurpleSlider';

const useStyles = makeStyles((theme) => ({
    slider: {
        width: 200,
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
            marginRight: theme.spacing(6),
        },
    },
    titlebar: {
        display: "flex",
        flexGrow: 1,
    },
    toolButton: {
        marginRight: "1vw",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    titleDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));


const Toolbar = (props) => {
    const classes = useStyles();

    return (
        <MaterialToolbar>
            <div className={classes.titlebar}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.drawerToggleClicked}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <div className={classes.titleDiv}>
                    <Typography variant="h6" className={classes.title}>
                        Pathfinding Visualizer
                    </Typography>

                </div>
                <Button
                    className={classes.toolButton}
                    variant="text"
                    disableElevation
                    onClick={() => props.visualize()}
                    disabled={props.anim}
                >
                    Visualize
            </Button>
                <Button
                    className={classes.toolButton}
                    variant="text"
                    disableElevation
                    onClick={() => props.clearGrid()}
                    disabled={props.anim}
                >
                    Clear Board
            </Button>
                <Button
                    className={classes.toolButton}
                    variant="text"
                    disableElevation
                    onClick={() => props.visualizeMaze(props.animateMaze)}
                    disabled={props.anim}
                >
                    Add Maze
            </Button>
                <Button
                    className={classes.toolButton}
                >

                    SPEED&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         {/* <Slider
                        className={classes.slider}
                        value={props.sliderValue}
                        onChange={props.sliderChanged}
                        aria-labelledby="continuous-slider" /> */}

                    <PurpleSlider />


                </Button>
            </div>
        </MaterialToolbar>
    );
};

export default Toolbar;