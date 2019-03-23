import React, { Component } from 'react';
import { connect } from 'react-redux';

import Today from './Today';
import FinishedTask from './FinishedTask';
import UnfinishedTask from './UnfinishedTask';

import { Layout, Row, Col, Progress, Statistic, Card, Icon } from 'antd';
const { Content } = Layout;


class Overview extends Component {

  getDoneTaskPercent() {
    let n = this.props.tasks.length
    let s = this.props.tasks.filter((v) => { return v.isDone }).length
    return parseFloat(((s / n) * 100).toFixed(2))
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
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ paddingTop: '40px' }}>
              <Today />
            </Col>
           <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ paddingTop: '20px' }}>
              <FinishedTask />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ paddingTop: '20px' }}>
              <UnfinishedTask />
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
