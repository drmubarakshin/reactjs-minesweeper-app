import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

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
            value: undefined
        };
        this.switchState = this.switchState.bind(this);
    }

    componentDidMount() {
        const { x, y } = this.props;
        this.setState({ x, y });
    }

    switchState(isDetonated, value = 0) {
        // handle cell state changing
        if (isDetonated)
            this.setState({ isDetonated: true });
        else {
            // this.setState({ value });
            const { x, y } = this.state;
            const { map, openedMap, openAvailableCells } = this.props;
            openAvailableCells({ x, y, map, openedMap });
        }
    }

    onRightButtonClick = (event) => {
        event.preventDefault();
        const { isFlagLaunched } = this.state;
        this.setState({ isFlagLaunched: !isFlagLaunched });
    }

    render() {
        const { x, y, value, isDetonated, isFlagLaunched } = this.state;
        const { map, openedMap, onClickHandler } = this.props;

        //

        if (map && openedMap) {
            console.log(map[x][y])
        }

        if (value || value === 0) {
            return (
                <div className='cell opened'>{value ? value : ''}</div>
            );
        }
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

const mapStateToProps = state => ({
    map: state.map,
    openedMap: state.openedMap
});

const mapDispatchToProps = dispatch => ({
    openAvailableCells: (...props) => dispatch(actions.openAvailableCells(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);