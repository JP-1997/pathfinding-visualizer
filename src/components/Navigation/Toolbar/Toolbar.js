import React from 'react';
import { IconButton, Typography, Button, makeStyles, Slider } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";

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
}));


const Toolbar = (props) => {
    const classes = useStyles();

    return (
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
            <Typography variant="h6" className={classes.title}>
                Pathfinding Visualizer
            </Typography>
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
            <div className={classes.toolButton}>
                SPEED
            <Slider
                    className={classes.slider}
                    value={props.sliderValue}
                    onChange={props.sliderChanged}
                    aria-labelledby="continuous-slider" />
            </div>
        </div>

    );
};

export default Toolbar;