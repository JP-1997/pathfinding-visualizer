import React, { Component } from 'react';
import classes from './Grid.module.css';
import Node from '../../components/Node/Node';
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";

const START_NODE_ROW = 20;
const START_NODE_COLUMN = 4;
const FINISH_NODE_ROW = 20;
const FINISH_NODE_COLUMN = 27;

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
        this.gridRef = React.createRef();
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

    setGrid = async (grid = getInitialGrid(this.props)) => {
        this.setState({grid});
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
                        onMouseUp={(row, column) => this.handleMouseUp()}
                    />
                );
            }
            nodes.push(<tr key={i}>{currentRow}</tr>)
        }
        return nodes;
    };

    handleMouseDown(row, column) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, column);
        this.setState({ grid: newGrid, mouseIsPressed: true });
    }

    handleMouseEnter(row, column) {
        if (!this.state.mouseIsPressed)
            return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, column);
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mouseIsPressed: false });
    }

    render() {
        const { grid, mouseIsPressed } = this.state;
        if (this.state.grid.length === 0)
            return <div>Loading...</div>
        return (
            <GridWrapper ref={this.gridRef}>
                <table className={classes.grid}>
                    <tbody>{this.loadNodes()}</tbody>
                </table>
            </GridWrapper>
        );
    }
}

const getInitialGrid = (props) => {
    const grid = [];
    for (let row = 0; row < props.rows; row++) {
        const currentRow = [];
        for (let column = 0; column < props.columns; column++) {
            currentRow.push(createNode(row, column));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (row, column) => {
    return {
        row,
        column,
        isStart: row === START_NODE_ROW && column === START_NODE_COLUMN,
        isFinish: row === FINISH_NODE_ROW && column === FINISH_NODE_COLUMN,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    }
};

const getNewGridWithWallToggled = (grid, row, column) => {
    const newGrid = grid.slice();
    const node = newGrid[row][column];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][column] = newNode;
    return newGrid;
};

export default Grid;