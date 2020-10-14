import React, { Component } from 'react';
import classes from './Grid.module.css';
import Node from '../../components/Node/Node';
import Spinner from '../../components/UI/Spinner/Spinner';
import Card from "@material-ui/core/Card";
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { setAnimating, setVisited, setShortest } from '../../store/actions';
import dijkstra from '../../algorithms/dijkstra';
import astar from '../../algorithms/astar';
import jumpPointSearch from '../../algorithms/jumpPointSearch';
import greedyBestFirstSearch from '../../algorithms/greedyBestFirstSearch';
import breadthFirstSearch from '../../algorithms/breadthFirstSearch';
import depthFirstSearch from '../../algorithms/depthFirstSearch';

let START_NODE_ROW = 20;
let START_NODE_COLUMN = 4;
let FINISH_NODE_ROW = 20;
let FINISH_NODE_COLUMN = 27;
let startIsSelected = false;
let finishIsSelected = false;
let startNode = { row: START_NODE_ROW, column: START_NODE_COLUMN };
let finishNode = { row: FINISH_NODE_ROW, column: FINISH_NODE_COLUMN };
let isAnimated = false;
let mouseIsPressed = false;

const wallClass = "nodeWall";

const GridWrapper = withStyles({
    root: {
        width: "100%",
        padding: "1vw",
        marginRight: "1vw"
    }
})(Card);

class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: []
        };
        this.nodeRefs = this.getRefs();
        this.gridRef = React.createRef();
    }

    getRefs = () => {
        let refs = [];
        for (let i = 0; i < this.props.rows; i++) {
            let rowRef = [];
            for (let j = 0; j < this.props.columns; j++)
                rowRef.push(React.createRef());
            refs.push(rowRef);
        }
        return refs;
    }

    async componentDidMount() {
        await this.setGrid();
        this.gridRef.current.style.height = `${(this.gridRef.current.offsetWidth /
            this.props.columns) *
            this.props.rows}px`;
        window.addEventListener("resize", e => {
            this.gridRef.current.style.height = `${(this.gridRef.current.offsetWidth /
                this.props.columns) *
                this.props.rows}px`;
        });
    }

    setGrid = async (grid = this.getInitialGrid()) => {
        this.setState({ grid });
    };

    getInitialGrid = () => {
        let grid = [];
        for (let row = 0; row < this.props.rows; row++) {
            const currentRow = [];
            for (let column = 0; column < this.props.columns; column++) {
                currentRow.push(this.createNode(row, column));
            }
            grid.push(currentRow);
        }
        return grid;
    };

    createNode = (row, column) => {
        return {
            row,
            column,
            isStart: row === START_NODE_ROW && column === START_NODE_COLUMN,
            isFinish: row === FINISH_NODE_ROW && column === FINISH_NODE_COLUMN,
            isVisited: false,
            isShortestPath: false,
            isWall: false,
            // distance: Infinity,
            // previousNode: null,
        };
    };

    loadNodes = () => {
        let nodes = [];
        for (let i = 0; i < this.props.rows; i++) {
            let currentRow = [];
            for (let j = 0; j < this.props.columns; j++) {
                currentRow.push(
                    <Node
                        key={i.toString() + "-" + j.toString()}
                        row={this.state.grid[i][j].row}
                        column={this.state.grid[i][j].column}
                        isStart={this.state.grid[i][j].isStart}
                        isFinish={this.state.grid[i][j].isFinish}
                        isWall={this.state.grid[i][j].isWall}
                        isVisited={this.state.grid[i][j].isVisited}
                        isShortestPath={this.state.grid[i][j].isShortestPath}
                        onMouseDown={(row, column) => this.handleMouseDown(row, column)}
                        onMouseEnter={(row, column) => this.handleMouseEnter(row, column)}
                        onMouseUp={(row, column) => this.handleMouseUp(row, column)}
                        ref={this.nodeRefs[i][j]}
                    />
                );
            }
            nodes.push(<tr key={i}>{currentRow}</tr>)
        }
        return nodes;
    };

    handleMouseDown = async (row, column) => {
        if(this.props.anim)
            return;
        if (row === START_NODE_ROW && column === START_NODE_COLUMN) {
            startIsSelected = true;
            let newGrid = this.changeStartNode(row, column);
            mouseIsPressed = true;
            this.setState({ grid: newGrid });
            return;
        }
        else if (row === FINISH_NODE_ROW && column === FINISH_NODE_COLUMN) {
            finishIsSelected = true;
            let newGrid = this.changeFinishNode(row, column);
            mouseIsPressed = true;
            this.setState({ grid: newGrid });
            return;
        }
        else {
            mouseIsPressed = true;
            this.toggleGridWall(row, column);
            if (isAnimated) this.visualizeRealTime(startNode, finishNode);
        }
    }

    handleMouseEnter = (row, column) => {
        if (!mouseIsPressed)
            return;
        if (startIsSelected || finishIsSelected)
            return;
        this.toggleGridWall(row, column);
        if (isAnimated) this.visualizeRealTime(startNode, finishNode);
        // this.setState({ grid: newGrid });
    }

    handleMouseUp = (row, column) => {
        if (startIsSelected) {
            let newGrid = this.changeStartNode(row, column);
            startIsSelected = false;
            START_NODE_ROW = row;
            START_NODE_COLUMN = column;
            this.setState({ grid: newGrid });
        }
        else if (finishIsSelected) {
            let newGrid = this.changeFinishNode(row, column);
            finishIsSelected = false;
            FINISH_NODE_ROW = row;
            FINISH_NODE_COLUMN = column;
            this.setState({ grid: newGrid });
        }
        mouseIsPressed = false;
        this.setGrid(this.state.grid);
    }

    changeStartNode = (row, column, grid = this.state.grid) => {
        let newGrid = grid.slice();
        const node = newGrid[row][column];
        const newNode = { ...node, isStart: !node.isStart };
        newGrid[row][column] = newNode;
        startNode = { row, column };
        return newGrid;
    };

    changeFinishNode = (row, column, grid = this.state.grid) => {
        let newGrid = grid.slice();
        const node = newGrid[row][column];
        const newNode = { ...node, isFinish: !node.isFinish };
        newGrid[row][column] = newNode;
        finishNode = { row, column };
        return newGrid;
    }

    toggleGridWall = (row, column) => {
        let grid = this.state.grid;
        if (grid[row][column].isWall) {
            this.nodeRefs[row][column].current.classList.remove(wallClass);
            grid[row][column].isWall = false;
        }
        else {
            this.nodeRefs[row][column].current.classList.add(wallClass);
            grid[row][column].isWall = true;
        }
    };

    clearGrid = () => {
        isAnimated = false;
        this.clearVisited(this.state.grid);
        this.setGrid();
    };

    visualize = async () => {
        this.props.setAnimating(true);
        let grid = this.state.grid;
        await this.setGrid(grid);
        this.clearVisited(grid);
        // console.log("[startNode] " + startNode.row + startNode.column);
        const response = await this.getResponseFromAlgo(grid, startNode, finishNode);
        const { visitedNodes, shortestPath } = response;
        visitedNodes.shift();
        shortestPath.shift();
        shortestPath.pop();
        if (visitedNodes.length === 0 && shortestPath.length === 0) {
            this.props.setAnimating(false);
            this.setGrid(grid);
            return;
        }
        this.animate(visitedNodes, shortestPath, grid);
    };

    getResponseFromAlgo = (grid, startNode, finishNode) => {
        let response;
        switch (this.props.algo) {
            case 0:
                response = dijkstra(grid, startNode, finishNode, this.props.diag);
                break;
            case 1:
                response = astar(grid, startNode, finishNode, this.props.heuristic[1], this.props.diag);
                break;
            case 2:
                response = jumpPointSearch(grid, startNode, finishNode);
                break;
            case 3:
                response = greedyBestFirstSearch(grid, startNode, finishNode);
                break;
            case 4:
                response = breadthFirstSearch(grid, startNode, finishNode);
                break;
            case 5:
                response = depthFirstSearch(grid, startNode, finishNode);
                break;
            default:
                break;
        }
        return response;
    };

    visualizeRealTime = (sn, en) => {
        let grid = this.state.grid;
        this.clearVisited(grid);
        const { visitedNodes, shortestPath } = this.getResponseFromAlgo(
            grid,
            sn,
            en
        );
        this.props.setVisited(visitedNodes.length);
        this.props.setShortest(shortestPath.length);
        visitedNodes.shift();
        shortestPath.shift();
        shortestPath.pop();
        visitedNodes.forEach(node => {
            this.nodeRefs[node.row][node.column].current.classList.add("visited");
        });
        shortestPath.forEach(node => {
            this.nodeRefs[node.row][node.column].current.classList.add("shortestPath");
        });
        return { visitedNodes, shortestPath };
    };

    animate = async (visitedNodes, shortestPath, grid) => {
        let i = 0;
        let j = 0;
        const animateVisitedNodes = async () => {
            if (i === visitedNodes.length) {
                if (shortestPath.length) requestAnimationFrame(animateShortestPath);
                else {
                    isAnimated = true;
                    this.props.setAnimating(false);
                    this.setGrid(grid);
                }
                return;
            }
            const { row, column } = visitedNodes[i];
            this.nodeRefs[row][column].current.classList.add('visited-anim');
            ++i;
            this.props.setVisited(i);
            requestAnimationFrame(animateVisitedNodes);
        };
        const animateShortestPath = () => {
            if (j === shortestPath.length) {
                isAnimated = true;
                this.props.setAnimating(false);
                this.setGrid(grid);
                return;
            }
            const { row, column } = shortestPath[j];
            this.nodeRefs[row][column].current.classList.add('shortestPath-anim');
            ++j;
            this.props.setShortest(j);
            requestAnimationFrame(animateShortestPath);
        };
        await requestAnimationFrame(animateVisitedNodes);
    };

    clearVisited = grid => {
        this.props.setVisited(0);
        this.props.setShortest(0);
        grid.forEach(row =>
            row.forEach(node => {
                node.isShortestPath = false;
                node.isVisited = false;
                this.nodeRefs[node.row][node.column].current.classList.remove("visited");
                this.nodeRefs[node.row][node.column].current.classList.remove(
                    "shortestPath"
                );
                this.nodeRefs[node.row][node.column].current.classList.remove(
                    "visited-anim"
                );
                this.nodeRefs[node.row][node.column].current.classList.remove(
                    "shortestPath-anim"
                );
            })
        );
    };

    render() {
        if (isAnimated) {
            const response = this.visualizeRealTime(startNode, finishNode);
            this.props.setVisited(response.visitedNodes.length);
            this.props.setShortest(response.shortestPath.length);
        }
        if (this.state.grid.length === 0)
            return <Spinner />;
        return (
            <GridWrapper ref={this.gridRef}>
                <table className={classes.grid}>
                    <tbody>{this.loadNodes()}</tbody>
                </table>
            </GridWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        algo: state.algo,
        diag: state.diag,
        heuristic: state.heuristic,
        maze: state.maze,
        anim: state.anim
    };
};

export default connect(mapStateToProps, { setAnimating, setVisited, setShortest }, null, { forwardRef: true })(Grid);