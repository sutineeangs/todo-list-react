import React, { Component } from 'react';
import { connect } from 'react-redux';

import Schedule from './Schedule';

import { Layout, Row, Col} from 'antd';
const { Content } = Layout;


class Calendar extends Component {

  render() {
    return (
      <Content style={{ margin: '16px' }}>
        <div style={{ padding: "24px", background: '#fff', minHeight: 360 }}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} >
              <Schedule />
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

var mapStateToProps = ({ todos }) => {
  return {
    tasks: todos.tasks,
  };
};

var mapDispatchToProps = function (dispatch) {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
