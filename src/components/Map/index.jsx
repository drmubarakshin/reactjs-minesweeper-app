import React from 'react';

import './styles.scss';
import Cell from '../Cell';

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            // map: [],
            width: 10,
            height: 10,
        }
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
        console.log(bombsMap)
    }

    onCellClick(x, y) {
        const { map } = this.state;
        if (map[x][y]) {
            
        }
    }

    renderRow(row, rindex) {
        return (
            <div className='row' key={rindex}>
                {row.map((_, eindex) =>
                    <Cell
                        key={`r${rindex}e${eindex}`}
                        x={rindex}
                        y={eindex}
                        onClickHandler={this.onCellClick.bind(this)}
                    />
                )}
            </div>
        );
    }

    renderMap() {
        const { map } = this.state;
        return (
            map && map.map((row, rindex) => this.renderRow(row, rindex))
        );
    }

    render() {
        return (
            <div className='map'>
                {this.renderMap()}
            </div>
        );
    }
}

export default Map;