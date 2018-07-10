import React from 'react';
import ReactDOM from 'react-dom';
import Navi from './js/navi.js';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navi />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
