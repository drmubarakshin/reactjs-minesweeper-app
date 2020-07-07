export const setGameState = (state) => ({
    type: 'SET_GAME_STATE',
    payload: state
});

export const setMap = (map) => ({
    type: 'SET_MAP',
    payload: map
});

export const setOpenedMap = (map) => ({
    type: 'SET_OPENED_MAP',
    payload: map
})
