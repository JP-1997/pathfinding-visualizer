import React from 'react';
import { Card, Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const AlgorithmDetailsCard = withStyles({
    root: {
        width: "100%",
        padding: "3%",
        marginBottom: "2vh",
        marginRigth: "2%"
    }
})(Card);

const getTitle = algo => {
    switch (algo) {
        case 0:
            return "Dijkstra's Algorithm";
        case 1:
            return "A* Search";
        case 2:
            return "Jump Point Search";
        case 3:
            return "Greedy Best-first Search";
        case 4:
            return "Breadth-first Search";
        case 5:
            return "Depth-first Search";
        default:
            return;
    }
};

const getContent = algo => {
    switch(algo) {
        case 0:
            return ``;
        case 1:
            return ``;
        case 2:
            return ``;
        case 3:
            return ``;
        case 4:
            return ``;
        case 5:
            return ``;
        default:
            return;
    }
};

const AlgorithmDetails = props => {
    return (
        <AlgorithmDetailsCard>
            <Typography variant="h4">{getTitle(props.algo)}</Typography>
            <br />
            <Typography variant="body1">{getContent(props.algo)}</Typography>
        </AlgorithmDetailsCard>
    );
};

const mapStateToProps = state => {
    return {
        algo: state.algo
    };
};

export default connect(mapStateToProps)(AlgorithmDetails);

