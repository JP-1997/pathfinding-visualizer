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

const dijkstraInfo = (
    <p>Dijkstra's algorithm picks the unvisited vertex with the lowest distance,
        calculates the distance through it to each unvisited neighbor, and updates 
        the neighbor's distance if smaller and Mark visited when done with neighbors.
        Dijkstra's Algorithm is weighted and guarantees the shortest path.<br />
        Worst-case performance: &Theta;((|V|+|E|)\log |V|) where |V| is the
        number of nodes and |E| is the number of edges.</p>
);

const aStarInfo = (
    <p>A* is an informed search algorithm, or a best-first search, meaning that it is 
        formulated in terms of weighted graphs: starting from a specific starting node of a graph,
         it aims to find a path to the given goal node having the smallest cost (least distance travelled,
          shortest time, etc.). It does this by maintaining a tree of paths originating at the start node 
          and extending those paths one edge at a time until its termination criterion is satisfied.<br />
          Worst-case performance: O(|E|) = O(b ^ d)<br />
          Worst-case space complexity: O(|V|) = O(b ^ d)<br />
          where b is the branching factor and d is the depth of the solution.
          </p>
);

const jpsInfo = (
    <p>
        Jump point search (JPS) is an optimization to the A* search algorithm for uniform-cost grids. 
        It reduces symmetries in the search procedure by means of graph pruning, eliminating certain 
        nodes in the grid based on assumptions that can be made about the current node's neighbors, 
        as long as certain conditions relating to the grid are satisfied. As a result, the algorithm 
        can consider long "jumps" along straight (horizontal, vertical and diagonal) lines in the grid, 
        rather than the small steps from one grid position to the next that ordinary A* considers.

    </p>
);

const getContent = algo => {
    switch(algo) {
        case 0:
            return dijkstraInfo;
        case 1:
            return aStarInfo;
        case 2:
            return jpsInfo;
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

