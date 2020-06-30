import React from 'react';
import './styles.scss';

import Map from './components/Map';

function App() {
    return (
        <Map
            bombsNum={5}
            width={10}
            height={10}
        />
    );
}

export default App;
