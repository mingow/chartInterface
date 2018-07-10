import React from 'react';
import ReactDOM from 'react-dom';
import Navi from './js/navi.js';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navi />
        <div className="App-header">
          <h2>欢迎来到菜鸟教程</h2>
        </div>
        <p className="App-intro">
          你可以在 <code>src/App.js</code> 文件中修改。
        </p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
