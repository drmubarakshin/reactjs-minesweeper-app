import React from 'react';

import Cell from '../Cell';

class Map extends React.Component {
    state = {
        map: undefined,
        width: 10,
        height: 10,
    };

    async createMap() {
        const { bombsNum, width, height } = this.props;
        const bombsMap = [];
        // fill in map with zeros
        for(let i = 0; i < width; i++) {
            let row = [];
            for(let j = 0; j < height; j++)
                row.push(0);
            bombsMap.push(row);
        }
        // create bombs
        const bombs = [];
        for(let i = 0; i < bombsNum; i++) {
            let x = Math.floor(Math.random() * Math.floor(width));
            let y = Math.floor(Math.random() * Math.floor(height));
            let point = { x, y };
            bombs.push(point);
        }
        // add bombs to map
        for(let i = 0; i < bombs.length; i++)
            bombsMap[bombs[i].x][bombs[i].y] = 1;
    }

    componentDidMount() {
        this.setState({
            width: this.props.width,
            height: this.props.height
        });
        this.createMap();        
    }

    render() {
        return (
            <div>
                Hi babes
            </div>
        );
    }
}

export default Map;