import React from 'react';
import './styles.scss';

import Map from './components/Map';

function App() {
    return (
        <div className="container">
            <Map
                bombsNum={5}
                width={10}
                height={10}
            />
        </div>
    );
}

export default App;
