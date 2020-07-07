import * as creators from './actionCreators';

const wrap = f => (...args) => f(...args).catch(console.log);

export const initMap = (props) => wrap(async dispatch => {
    const bombsMap = [];
    const { bombsNum, width, height } = props;
    for (let i = 0; i < width; i++) {
        bombsMap.push(new Array(height).fill(0));
    }
    // create bombs
    for (let i = 0; i < bombsNum;) {
        let x = Math.floor(Math.random() * Math.floor(width));
        let y = Math.floor(Math.random() * Math.floor(height));
        if (bombsMap[x][y] !== 'F') {
            bombsMap[x][y] = 'F';
            i++;
        }
    }
    // fill the numbers for the cells
    const bfs = (x, y) => {
        if (bfsMap[x][y]) {
            return;
        }

        let cnt = 0;
        bfsMap[x][y] = 1;

        // handle current cell;
        if (y - 1 >= 0)
            cnt += bombsMap[x][y - 1] === 'F' ? 1 : 0;
        if (y + 1 < height)
            cnt += bombsMap[x][y + 1] === 'F' ? 1 : 0;
        if (x - 1 >= 0) {
            cnt += bombsMap[x - 1][y] === 'F' ? 1 : 0;
            if (y - 1 >= 0)
                cnt += bombsMap[x - 1][y - 1] === 'F' ? 1 : 0;
            if (y + 1 < height)
                cnt += bombsMap[x - 1][y + 1] === 'F' ? 1 : 0;
        }
        if (x + 1 < width) {
            cnt += bombsMap[x + 1][y] === 'F' ? 1 : 0;
            if (y - 1 >= 0)
                cnt += bombsMap[x + 1][y - 1] === 'F' ? 1 : 0;
            if (y + 1 < height)
                cnt += bombsMap[x + 1][y + 1] === 'F' ? 1 : 0;
        }
        // Set the value 
        if (bombsMap[x][y] !== 'F') {
            bombsMap[x][y] = cnt;
        }

        // Go deeper into other cells
        if (x - 1 >= 0) {
            bfs(x - 1, y);
            if (y - 1 > 0)
                bfs(x - 1, y - 1);
            if (y + 1 < height)
                bfs(x - 1, y + 1);
        }
        if (y - 1 >= 0) bfs(x, y - 1);
        if (y + 1 < height) bfs(x, y + 1);
        if (x + 1 < width) {
            bfs(x + 1, y);
            if (y - 1 >= 0)
                bfs(x + 1, y - 1);
            if (y + 1 < height)
                bfs(x + 1, y + 1);
        }
    };

    const bfsMap = [];
    const openedCellsMap = [];
    for (let i = 0; i < width; i++) {
        bfsMap.push(new Array(height).fill(0));
        openedCellsMap.push(new Array(height).fill(0));
    }

    bfs(0, 0);

    dispatch(creators.setGameState(true));
    dispatch(creators.setMap(bombsMap));
    dispatch(creators.setOpenedMap(openedCellsMap));
});

export const setGameState = (state) => wrap(async dispatch => {
    dispatch(creators.setGameState(state));
});

export const openAvailableCells = (props) => wrap(async dispatch => {
    const { cx, cy, map, openedMap } = props;
    const width  = map.length,
          height = map[0].length;
    if (map[cx][cy]) {
        openedMap[cx][cy] = 1;
    } else {
        const openCells = (x, y) => {
            openedMap[x][y] = 1;

            if (map[x][y] || openedMap[x][y]) {
                return;
            }

            // Go deeper into other cells
            if (x - 1 >= 0) {
                openCells(x - 1, y);
                if (y - 1 > 0)
                    openCells(x - 1, y - 1);
                if (y + 1 < height)
                    openCells(x - 1, y + 1);
            }
            if (y - 1 >= 0)     openCells(x, y - 1);
            if (y + 1 < height) openCells(x, y + 1);
            if (x + 1 < width) {
                openCells(x + 1, y);
                if (y - 1 >= 0)
                    openCells(x + 1, y - 1);
                if (y + 1 < height)
                    openCells(x + 1, y + 1);
            }
        }
        openCells(cx, cy);
    }
    dispatch(creators.setOpenedMap(openedMap));
});