import React from 'react';
import { withStyles, Card, Typography, LinearProgress } from '@material-ui/core';

const VisitedWrapper = withStyles({
    root: {
        width: "100%",
        padding: "3%",
        marginBottom: "2vh"
    }
})(Card);

const Visited = props => {
    const progress = (props.visited * 100) / (props.rows * props.columns);
    return (
        <VisitedWrapper>
            <Typography variant="h6">Visited</Typography>
            <Typography variant="h3"><div>.......visited.........</div></Typography>
            <LinearProgress variant="determinate" value={progress} />
        </VisitedWrapper>
    );
};

//Connect with store....

export default Visited;