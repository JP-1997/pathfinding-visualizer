import React from 'react';
import { withStyles, Card, Typography, LinearProgress } from '@material-ui/core';
import { connect } from "react-redux";

const VisitedWrapper = withStyles({
    root: {
        width: "100%",
        padding: "3%",
        marginBottom: "2vh"
    }
})(Card);

const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: "#B366F2"
    },
    barColorPrimary: {
        backgroundColor: "white"
    }
})(LinearProgress);

const Visited = props => {
    const progress = (props.visited * 100) / (props.rows * props.columns);
    return (
        <VisitedWrapper>
            <Typography variant="h6">Visited</Typography>
            <Typography variant="h3">{props.visited}</Typography>
            <ColorLinearProgress variant="determinate" value={progress} />
        </VisitedWrapper>
    );
};

const mapStateToProps = state => {
    return {
        visited: state.visited
    };
};

export default connect(mapStateToProps)(Visited);