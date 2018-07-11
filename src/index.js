import React from 'react';
import ReactDOM from 'react-dom';
import Navi from './js/navi.js';
import Layout from './js/layout.js';
import {BrowserRouter,Route} from 'react-router-dom';
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN'


class App extends React.Component {
  render() {
    return (
      <LocaleProvider locale={zh_CN} className="App">
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </LocaleProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
