import React, { PureComponent } from 'react';
import classes from './Node.module.css';

class Node extends PureComponent {
    render() {
        const {
            row,
            column,
            isStart,
            isFinish,
            isWall,
            onMouseEnter,
            onMouseDown,
            onMouseUp,
        } = this.props;
        const extraClassName = isStart
            ? 'nodeStart'
            : isFinish
            ? 'nodeFinish'
            : this.props.isShortestPath
            ? 'shortestPath'
            : this.props.isVisited
            ? 'visited'
            : isWall
            ? 'nodeWall'
            : '';
        return (
            <td
                id={`node-${row}-${column}`}
                className={[classes.node, classes[extraClassName]].join(' ')}
                onMouseDown={() => onMouseDown(row, column)}
                onMouseEnter={() => onMouseEnter(row, column)}
                onMouseUp={() => onMouseUp(row, column)}
                ref={this.props.forwardRef}
            ></td>
        );
    }
}

export default React.forwardRef((props, ref) => (
    <Node {...props} forwardRef={ref} />
));
