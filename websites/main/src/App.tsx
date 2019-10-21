import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Placeholder} from "./placeholder/Placeholder";
import Main from './Main';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
      {process.env.REACT_APP_ONLINE_EDITOR === "true"
            ? <Main/>
            : <Placeholder/>
        }
      </BrowserRouter>
    </div>
  );
};

export default App;
