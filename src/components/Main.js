import React, { Component } from 'react';

import { Layout, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;


class Main extends Component {

  render() {
    return (
      <Layout style={{ marginLeft: this.props.collapsed ? '80px' : '200px' }}>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            Bill is a cat.
              <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
            <h1>aaaaa</h1>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
          </Footer>
      </Layout>
    );
  }
}

export default Main;
