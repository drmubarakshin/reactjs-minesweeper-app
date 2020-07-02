import React from 'react';

import './styles.scss';
import Cell from '../Cell';

class Map extends React.Component {
    state = {
        width: 10,
        height: 10,
        isGameOver: false
    }

    componentDidMount() {
        this.setState({
            width: this.props.width,
            height: this.props.height
        });
        this.createMap();
    }

    createMap() {
        const bombsMap = [];
        const { bombsNum, width, height } = this.props;
        // fillin map with zeros
        for (let i = 0; i < width; i++) {
            let row = [];
            for (let j = 0; j < height; j++)
                row.push(0);
            bombsMap.push(row);
        }
        // create bombs
        const bombs = [];
        for (let i = 0; i < bombsNum; i++) {
            let x = Math.floor(Math.random() * Math.floor(width));
            let y = Math.floor(Math.random() * Math.floor(height));
            let point = { x, y };
            bombs.push(point);
        }
        // add bombs to map
        for (let i = 0; i < bombs.length; i++) {
            bombsMap[bombs[i].x][bombs[i].y] = 1;
        }

        this.setState({ map: bombsMap });
        console.log(bombsMap);
    }

    onCellClick(x, y, switchCellState) {
        const { map } = this.state;
        if (map[x][y]) {
            // handle end game
            switchCellState(true);
            this.setState({ isGameOver: true });
        } else {
            // handle cell opening
        }
    }

    render() {
        const { map, isGameOver } = this.state;
        if (isGameOver) {
            return (
                <h1 className=''>
                    GAME OVER
                </h1>
            );
        }
        return (
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
        );
    }
}

export default Map;