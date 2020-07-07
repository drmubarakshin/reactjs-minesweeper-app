const keys = {
    SET_MAP: 'map',
    SET_OPENED_MAP: 'openedMap',
    SET_GAME_STATE: 'gameState',
};

export default function reducer(state = {}, { type, payload }) {
    switch (type) {
        case 'a': {
            break;
        }
        default: break;
    }

    const key = keys[type];
    return {
        ...state,
        ...(key
            ? { [key]: payload }
            : {}
        )
    };
}