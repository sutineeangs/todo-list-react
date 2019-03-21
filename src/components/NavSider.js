import React, { Component } from 'react';

import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


class NavSider extends Component {

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.props.collapsed}
        onCollapse={this.props.onCollapse}
        style={{
          overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
        }}
      >
        <div className="logo">Todo List</div>
        <Menu theme="dark" defaultSelectedKeys={[this.props.selectedMenu]} mode="inline" onClick={this.props.selectMenu}>
          <Menu.Item key="Overview">
            <Icon type="pie-chart" />
            <span>Overview</span>
          </Menu.Item>
          <Menu.Item key="Tasks">
            <Icon type="profile" />
            <span>Tasks</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="user" /><span>User</span></span>}
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={<span><Icon type="team" /><span>Team</span></span>}
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="Setting">
            <Icon type="setting" />
            <span>Setting</span>
          </Menu.Item>
        </Menu>
      </Sider>

    );
  }
}

export default NavSider;
