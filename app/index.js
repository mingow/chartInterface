import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div className="App">
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
