import { Menu, Icon, Layout, Breadcrumb} from 'antd';
import Navi from './navi.js';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Header, Content, Sider} = Layout;
import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import MainFrame from '../frames/MainFrame.js'


function tmp(){
  return  (
    <h2>test</h2>
  )
}

function tmp2(){
  return  (
    <h2>testNew</h2>
  )
}

export default class webLayout extends React.Component {

  constructor(){
    super();
    this.state = {
      current: 'mail'
    }
  }


  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Layout>
        <Header className="header topBar">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">首页</Menu.Item>
            <Menu.Item key="2">月报汇总</Menu.Item>
            <Menu.Item key="3">当前生产情况</Menu.Item>
          </Menu>
        </Header>
        <Layout className="body">
          <Sider className="sideBar" width={200} style={{ background: '#fff' }}>
            <Navi />
          </Sider>
          <Layout className="content" style={{ padding: '0 24px 24px' }}>

            <Content  style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <Route exact path="/" component={MainFrame}></Route>
            </Content>
          </Layout>
        </Layout>
      </Layout>

    );
  }

}
