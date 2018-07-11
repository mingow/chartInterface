import { Menu, Icon, Layout, Breadcrumb} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {Header, Content, Sider} = Layout;
import React from 'react';
import {Link} from 'react-router-dom';

export default class Navi extends React.Component {

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
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key="sub1" title={<span><Icon type="user" />部门数据</span>}>
          <Menu.Item key="1"><Link to="/test" >后段人均产值</Link></Menu.Item>
          <Menu.Item key="2">目标达成情况</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="laptop" />产品数据</span>}>
          <Menu.Item key="5">生产量变化</Menu.Item>
          <Menu.Item key="6">效率变化</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }

}
