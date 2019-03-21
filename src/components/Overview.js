import React, { Component } from 'react';

import { Layout } from 'antd';
const { Content } = Layout;


class Overview extends Component {

  render() {
    return (
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {"Overview"}
          </div>
        </Content>
    );
  }
}

export default Overview;
