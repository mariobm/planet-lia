import React from 'react';
import './App.css';
import {Placeholder} from "./placeholder/Placeholder";
import Main from './Main';

const App: React.FC = () => {
  return (
    <div>
        {process.env.REACT_APP_ONLINE_EDITOR === "true"
            ? <Main/>
            : <Placeholder/>
        }
    </div>
  );
};

export default App;
