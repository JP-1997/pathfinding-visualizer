import React from 'react';
import OrangeRadio from '../../UI/OrangeRadio/OrangeRadio';
import { List, ListItem, Typography, CardContent, Collapse, FormControlLabel, FormLabel, RadioGroup, Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    header: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}))

const sideDrawer = (props) => {
    const classes = useStyles();
    return (
        <div>
            <List>
                <Typography variant="h6" className={classes.header}>
                    Algorithms
                </Typography>
                <ListItem
                    button
                    disabled={anim}
                    selected={algo === 0}
                    onClick={(event) => {
                        handleAlgoClick(0);
                    }}
                >
                    Dijkstra
                </ListItem>
                <ListItem
                    button
                    selected={algo === 1}
                    disabled={anim}
                    onClick={(event) => {
                        handleAlgoClick(1);
                    }}
                >
                    A*
                    <Collapse in={algo === 1} timeout="auto" unmountOnExit>
                        <CardContent>
                            <FormLabel>Heuristic</FormLabel>
                            <RadioGroup value={heuristic[1]} onChange={handleHeuristicChange}>
                                <FormControlLabel
                                    size="small"
                                    value="euclidean"
                                    control={<OrangeRadio />}
                                    label="Euclidean"
                                />
                                <FormControlLabel
                                    size="small"
                                    value="manhatten"
                                    control={<OrangeRadio />}
                                    label="Manhatten"
                                />
                                <FormControlLabel
                                    size="small"
                                    value="chebyshev"
                                    control={<OrangeRadio />}
                                    label="Chebyshev"
                                />
                                <FormControlLabel
                                    size="small"
                                    value="octile"
                                    control={<OrangeRadio />}
                                    label="Octile"
                                />
                            </RadioGroup>
                        </CardContent>
                    </Collapse>
                </ListItem>
                <ListItem
                    button
                    selected={algo === 2}
                    disabled={anim}
                    onClick={(event) => {
                        handleAlgoClick(2);
                    }}
                >
                    Jump Point Search
                </ListItem>
                <ListItem
                    button
                    selected={algo === 3}
                    disabled={anim}
                    onClick={(event) => {
                        handleAlgoClick(3);
                    }}
                >
                    Greedy Best-first Search
                </ListItem>
                <ListItem
                    button
                    selected={algo === 4}
                    disabled={anim}
                    onClick={(event) => {
                        handleAlgoClick(4);
                    }}
                >
                    Breadth-first Search
                </ListItem>
                <ListItem
                    button
                    selected={algo === 5}
                    disabled={anim}
                    onClick={(event) => {
                        handleAlgoClick(5);
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
                    selected={maze === 0}
                    disabled={anim}
                    onClick={(event) => {
                        handleMazeItemClick(0);
                    }}
                >
                    Kruskal
                </ListItem>
                <ListItem
                    button
                    selected={maze === 1}
                    disabled={anim}
                    onClick={(event) => {
                        handleMazeItemClick(1);
                    }}
                >
                    Prim
                </ListItem>
                <ListItem
                    button
                    selected={maze === 2}
                    disabled={anim}
                    onClick={(event) => {
                        handleMazeItemClick(2);
                    }}
                >
                    Recursive Division
                </ListItem>
            </List>
        </div>
    );
};

export default sideDrawer;