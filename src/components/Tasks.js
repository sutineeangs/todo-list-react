import React, { Component } from 'react';

import { Layout } from 'antd';
const { Content } = Layout;


class Tasks extends Component {

  render() {
    return (
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {"Tasks"}
          </div>
        </Content>
    );
  }
}

export default Tasks;
