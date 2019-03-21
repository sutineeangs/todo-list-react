import React, { Component } from 'react';

import { Layout } from 'antd';
const { Content, Footer } = Layout;


class Main extends Component {

  render() {
    let text = "00000"

    return (
      <Layout style={{ marginLeft: this.props.collapsed ? '80px' : '200px' }}>

        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {text}
          </div>
        </Content>


        <Footer style={{ textAlign: 'center' }}>
          Todo List Demo ©2019 Created by Sutinee Songkla
        </Footer>
      </Layout>
    );
  }
}

export default Main;
