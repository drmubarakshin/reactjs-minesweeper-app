import React from 'react';

import './styles.scss';
import mine from '../../assets/blackMine.jpg';

class Cell extends React.Component {
    constructor() {
        super();
        this.state = {
            x: undefined,
            y: undefined,
            isDetonated: false,
            isFlagLaunched: false,
        };
        // this.setState.bind(this);
        this.switchState = this.switchState.bind(this);
    }

    componentDidMount() {
        const { x, y } = this.props;
        this.setState({ x, y });
    }

    switchState(isDetonated, number = 0) {
        // handle cell state changing
        if (isDetonated)
            this.setState({ isDetonated: true });
    }

    onRightButtonClick = (event) => {
        event.preventDefault();
        const { isFlagLaunched } = this.state;
        this.setState({ isFlagLaunched: !isFlagLaunched });
    }

    render() {
        const { x, y, isDetonated, isFlagLaunched } = this.state;
        const { onClickHandler } = this.props;
        return isDetonated ? (
            <div className='cell'>
                <img
                    src={mine}
                    alt={'mine'}
                    className='cell detonated'
                />
            </div>
        ) : isFlagLaunched ? (
            <div
                className='cell launched'
                onClick={() => onClickHandler(x, y, this.switchState)}
                onContextMenu={this.onRightButtonClick}
            />
        ) : (
            <div
                className='cell'
                onClick={() => onClickHandler(x, y, this.switchState)}
                onContextMenu={this.onRightButtonClick}
            />
        );
    }
}

export default Cell;