import React from 'react';
import './styles.scss';

import Map from './components/Map';

function App() {
    return (
        <div className="container">
            <Map
                bombsNum={5}
                width={5}
                height={5}
            />
        </div>
    );
}

export default App;
