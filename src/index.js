import React from 'react';
import ReactDOM from 'react-dom';
import Navi from './js/navi.js';
import Layout from './js/layout.js';
import {BrowserRouter,Route} from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
