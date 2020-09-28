import React, { Component } from 'react';
import classes from './Grid.module.css';
import Node from '../../components/Node/Node';
import Spinner from '../../components/UI/Spinner/Spinner';
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";

let START_NODE_ROW = 20;
let START_NODE_COLUMN = 4;
let FINISH_NODE_ROW = 20;
let FINISH_NODE_COLUMN = 27;
let startIsSelected = false;
let finishIsSelected = false;


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
            grid: [],
            mouseIsPressed: false
        };
        // this.nodeRefs = this.getRefs();
        this.gridRef = React.createRef();
    }

    // getRefs = () => {
    //     let refs = [];
    //     for(let i = 0; i < this.props.rows; i++) {
    //         let rowRef = [];
    //         for(let j = 0; j < this.props.columns; j++)
    //             rowRef.push(React.createRef());
    //         refs.push(rowRef);
    //     }
    //     return refs;
    // }

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

    setGrid = async (grid = this.getInitialGrid(this.props)) => {
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
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
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
                        onMouseDown={(row, column) => this.handleMouseDown(row, column)}
                        onMouseEnter={(row, column) => this.handleMouseEnter(row, column)}
                        onMouseUp={(row, column) => this.handleMouseUp(row, column)}
                    // ref={this.nodeRefs[i][j]}
                    />
                );
            }
            nodes.push(<tr key={i}>{currentRow}</tr>)
        }
        return nodes;
    };

    handleMouseDown = async (row, column) => {
        if (row === START_NODE_ROW && column === START_NODE_COLUMN) {
            startIsSelected = true;
            let newGrid = this.changeStartNode(row, column);
            this.setState({ grid: newGrid, mouseIsPressed: true });
            return;
        }
        else if (row === FINISH_NODE_ROW && column === FINISH_NODE_COLUMN) {
            finishIsSelected = true;
            let newGrid = this.changeFinishNode(row, column);
            this.setState({ grid: newGrid, mouseIsPressed: true });
            return;
        }
        else {
            const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, column);
            this.setState({ grid: newGrid, mouseIsPressed: true });
        }
    }

    handleMouseEnter(row, column) {
        if (!this.state.mouseIsPressed)
            return;
        if (startIsSelected || finishIsSelected)
            return;
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, column);
        this.setState({ grid: newGrid });
    }

    handleMouseUp(row, column) {
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
        this.setState({ mouseIsPressed: false });
    }

    changeStartNode = (row, column, grid = this.state.grid) => {
        let newGrid = grid.slice();
        const node = newGrid[row][column];
        const newNode = { ...node, isStart: !node.isStart };
        newGrid[row][column] = newNode;
        return newGrid;
    };

    changeFinishNode = (row, column, grid = this.state.grid) => {
        let newGrid = grid.slice();
        const node = newGrid[row][column];
        const newNode = { ...node, isFinish: !node.isFinish };
        newGrid[row][column] = newNode;
        return newGrid;
    }

    getNewGridWithWallToggled = (grid, row, column) => {
        const newGrid = grid.slice();
        const node = newGrid[row][column];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][column] = newNode;
        return newGrid;
    };

    clearGrid= () => {
        this.setGrid();
    };

    render() {
        // const { grid, mouseIsPressed } = this.state;
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







export default Grid;