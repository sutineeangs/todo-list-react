import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Layout, Row, Col, Progress, Statistic, Card, Icon } from 'antd';
const { Content } = Layout;


class Overview extends Component {

  getDoneTaskPercent() {
    let n = this.props.tasks.length
    let s = this.props.tasks.filter((v) => { return v.isDone }).length
    return ((s / n) * 100).toFixed(2)
  }

  getNumberOfFinishedTasks(){
    let n = this.props.tasks.filter((v) => { return v.isDone }).length
    return n
  }

  getNumberOfUnfinishedTasks(){
    let n = this.props.tasks.filter((v) => { return !v.isDone }).length
    return n
  }

  render() {
    return (
      <Content style={{ margin: '16px' }}>
        <div style={{ padding: "50px 24px 24px 24px", background: '#fff', minHeight: 360 }}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ textAlign: 'center' }}>
              <Progress type="circle" percent={this.getDoneTaskPercent()} />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ paddingTop: '10px' }}>
              <Card>
                <Statistic
                  title="Finished"
                  value={this.getNumberOfFinishedTasks()}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<Icon type="check" />}
                  suffix={`/ ${this.props.tasks.length}`} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{ paddingTop: '10px' }}>
              <Card>
                <Statistic 
                title="Unfinished" 
                value={this.getNumberOfUnfinishedTasks()} 
                valueStyle={{ color: '#cf1322' }}
                prefix={<Icon type="close" />}
                suffix={`/ ${this.props.tasks.length}`} />
              </Card>
            </Col>
            {/* <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ paddingTop: '40px' }}>
              Notification
            </Col> */}
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ paddingTop: '40px' }}>
              Calendar
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
    // deleteTask: function (task) {
    //   return dispatch(todosActions.deleteTask(task));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
