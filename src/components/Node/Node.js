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
            ? 'node-start'
            : isFinish
            ? 'node-finish'
            : isWall
            ? 'node-wall'
            : '';
        return (
            <td
                id={`node-${row}-${column}`}
                className={`${classes.node} ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, column)}
                onMouseEnter={() => onMouseEnter(row, column)}
                onMouseUp={() => onMouseUp(row, column)}
            ></td>
        );
    }
}

export default Node;