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
    render() {
        const { x, y } = this.state;
        const { onClickHandler } = this.props;
        return (
            <div
                className='cell'
                onClick={() => onClickHandler(x, y)}
            />
        );
    }
}

export default Cell;