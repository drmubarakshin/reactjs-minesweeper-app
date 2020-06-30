import React from 'react';

import './styles.scss';

class Cell extends React.Component {
    state = {
        x: undefined,
        y: undefined
    }
    componentDidMount() {
        const { x, y } = this.props;
        this.setState({ x, y });
    }
    switchState(isOpened) {
        // handle cell state changing
    }
    render() {
        const { x, y } = this.state;
        const { onClickHandler } = this.props;
        return (
            <div
                className='cell'
                onClick={() => onClickHandler(x, y, this.switchState)}
            />
        );
    }
}

export default Cell;