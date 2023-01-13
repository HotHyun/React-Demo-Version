import React, { useState } from 'react';

import Button from './components/UI/Button/Button';

import './App.css';

function App() {
    const [showparagraph, setShowparagraph] = useState(false);

    const Check = () => {
        setShowparagraph((prevShowparagraph) => !prevShowparagraph);
    };

    return (
        <div className="app">
            <h1>Hi there!</h1>
            {showparagraph && <p>Show Paragraph !!</p>}
            <Button onClick={Check}>If you Click, Show Paragraph</Button>
        </div>
    );
}

export default App;
