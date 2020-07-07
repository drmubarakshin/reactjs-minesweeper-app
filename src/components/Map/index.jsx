import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';
import Cell from '../Cell';

import * as actions from '../../store/actions';

class Map extends React.Component {
    async componentDidMount() {
        const { bombsNum, width, height } = this.props;
        await this.props.initMap({ bombsNum, width, height });
    }

    onCellClick(x, y, switchCellState) {
        const { map, setGameState } = this.props;
        if (map[x][y] === 'F') {
            // handle end game
            switchCellState(true);
            setGameState(false);
        } else {
            // handle cell opening
            if (map[x][y] === 0) {

            }
            switchCellState(false);
        }
    }

    render() {
        const { map, gameState } = this.props;
        return (
            <React.Fragment>
                {!gameState && <h1 className='gameover'>GAME OVER</h1>}
                <div className='map'>{map && map.map((row, rindex) =>
                    <div className='row' key={rindex}>{row.map((_, eindex) =>
                        <Cell
                            key={`r${rindex}e${eindex}`}
                            x={rindex}
                            y={eindex}
                            onClickHandler={this.onCellClick.bind(this)}
                        />)}
                    </div>)}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    map: state.map,
    gameState: state.gameState
});

const mapDispatchToProps = dispatch => ({
    initMap: (...props) => dispatch(actions.initMap(...props)),
    setGameState: (state) => dispatch(actions.setGameState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);