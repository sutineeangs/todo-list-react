import React, { Component } from 'react';
import { withRouter } from "react-router-dom"

import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;


class NavSider extends Component {

  selectMenu(e){
    this.props.selectMenu(e)
    this.props.history.push(`/${e.key}`);
  }

  render() {
    let me = this;
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
        <Menu theme="dark" defaultSelectedKeys={[this.props.selectedMenu]} mode="inline" onClick={(e)=>{me.selectMenu(e)}}>
          <Menu.Item key="Overview">
            <Icon type="pie-chart" />
            <span>Overview</span>
          </Menu.Item>
          <Menu.Item key="Calendar">
            <Icon type="calendar" />
            <span>Calendar</span>
          </Menu.Item>
          <Menu.Item key="Tasks">
            <Icon type="profile" />
            <span>Tasks</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

// export default NavSider
export default withRouter(NavSider);
