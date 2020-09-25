import React from 'react';
import PurpleRadio from '../../UI/PurpleRadio/PurpleRadio';
import { List, ListItem, Typography, CardContent, Collapse, FormControlLabel, FormLabel, RadioGroup, Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    header: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

const SideDrawer = (props) => {

    const { heuristic } = props;

    const classes = useStyles();
    return (
        <div>
            <List>
                <Typography variant="h6" className={classes.header}>
                    Algorithms
                </Typography>
                <ListItem
                    button
                    disabled={props.anim}
                    selected={props.algo === 0}
                    onClick={(event) => {
                        props.algoClicked(0);
                    }}
                >
                    Dijkstra
                </ListItem>
                <ListItem
                    button
                    selected={props.algo === 1}
                    disabled={props.anim}
                    onClick={(event) => {
                        props.algoClicked(1);
                    }}
                >
                    A*
                    <Collapse in={props.algo === 1} timeout="auto" unmountOnExit>
                        <CardContent>
                            <FormLabel>Heuristic</FormLabel>
                            <RadioGroup value={heuristic[1]} onChange={props.heuristicChanged}>
                                <FormControlLabel
                                    size="small"
                                    value="euclidean"
                                    control={<PurpleRadio />}
                                    label="Euclidean"
                                />
                                <FormControlLabel
                                    size="small"
                                    value="manhatten"
                                    control={<PurpleRadio />}
                                    label="Manhatten"
                                />
                                <FormControlLabel
                                    size="small"
                                    value="chebyshev"
                                    control={<PurpleRadio />}
                                    label="Chebyshev"
                                />
                                <FormControlLabel
                                    size="small"
                                    value="octile"
                                    control={<PurpleRadio />}
                                    label="Octile"
                                />
                            </RadioGroup>
                        </CardContent>
                    </Collapse>
                </ListItem>
                <ListItem
                    button
                    selected={props.algo === 2}
                    disabled={props.anim}
                    onClick={(event) => {
                        props.algoClicked(2);
                    }}
                >
                    Jump Point Search
                </ListItem>
                <ListItem
                    button
                    selected={props.algo === 3}
                    disabled={props.anim}
                    onClick={(event) => {
                        props.algoClicked(3);
                    }}
                >
                    Greedy Best-first Search
                </ListItem>
                <ListItem
                    button
                    selected={props.algo === 4}
                    disabled={props.anim}
                    onClick={(event) => {
                        props.algoClicked(4);
                    }}
                >
                    Breadth-first Search
                </ListItem>
                <ListItem
                    button
                    selected={props.algo === 5}
                    disabled={props.anim}
                    onClick={(event) => {
                        props.algoClicked(5);
                    }}
                >
                    Depth-first Search
                </ListItem>
                <Divider />
                <Typography variant="h6" className={classes.header}>
                    Mazes
                </Typography>
                <ListItem
                    button
                    selected={props.maze === 0}
                    disabled={props.anim}
                    onClick={(event) => {
                        props.mazeItemClicked(0);
                    }}
                >
                    Kruskal
                </ListItem>
                <ListItem
                    button
                    selected={props.maze === 1}
                    disabled={props.anim}
                    onClick={(event) => {
                        props.mazeItemClicked(1);
                    }}
                >
                    Prim
                </ListItem>
                <ListItem
                    button
                    selected={props.maze === 2}
                    disabled={props.anim}
                    onClick={(event) => {
                        props.mazeItemClicked(2);
                    }}
                >
                    Recursive Division
                </ListItem>
            </List>
        </div>
    );
};

export default SideDrawer;