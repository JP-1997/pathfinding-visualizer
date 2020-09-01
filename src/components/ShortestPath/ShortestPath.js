import React from 'react';
import { withStyles, LinearProgress, Typography, Card } from '@material-ui/core';

const ShortestPathCard = withStyles({
    root: {
        width: "100%",
        padding: "3%",
        marginBottom: "2vh"
    }
})(Card);

const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: "orange"
    },
    barColorPrimary: {
        backgroundColor: "white"
    }
})(LinearProgress);

const ShortestPath = props => {
    const progress = (props.shortest * 100) / (props.rows * props.columns);
    return (
        <ShortestPathCard className="shortestPathCard">
            <Typography variant="h6">Shortest Path</Typography>
            <Typography variant="h3">....Shortest....</Typography>
            <ColorLinearProgress variant="determinate" value={progress} />
        </ShortestPathCard>
    );
};

export default ShortestPath;