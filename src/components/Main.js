import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Routes from './Routes';

import { Layout } from 'antd';
const { Footer } = Layout;


class Main extends Component {

  render() {
    return (
      <Layout style={{ marginLeft: this.props.collapsed ? '80px' : '200px' }}>
          <Route component={Routes} />
        <Footer style={{ textAlign: 'center' }}>
          Todo List Demo ©2019 Created by Sutinee Songkla
        </Footer>
      </Layout>
    );
  }
}

export default Main;
