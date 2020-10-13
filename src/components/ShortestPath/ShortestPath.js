import React from 'react';
import { withStyles, LinearProgress, Typography, Card } from '@material-ui/core';
import { connect } from "react-redux";

const ShortestPathCard = withStyles({
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

const ShortestPath = props => {
    const progress = (props.shortest * 100) / (props.rows * props.columns);
    return (
        <ShortestPathCard className="shortestPathCard">
            <Typography variant="h6">Shortest Path</Typography>
            <Typography variant="h3">{props.shortest}</Typography>
            <ColorLinearProgress variant="determinate" value={progress} />
        </ShortestPathCard>
    );
};

const mapStateToProps = state => {
    return {
        shortest: state.shortest
    };
};

export default connect(mapStateToProps)(ShortestPath);