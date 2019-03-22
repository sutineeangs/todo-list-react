import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { Row, Col, Typography, Tag } from 'antd';
const { Text } = Typography;



class DetailTask extends Component {

  render() {
    return (
      <Row gutter={16}>
        <Col span={6}><Text strong>ID:</Text></Col>
        <Col span={18}>{this.props.task.id}</Col>
        <Col span={6}><Text strong>Description:</Text></Col>
        <Col span={18}>{this.props.task.description}</Col>
        <Col span={6}><Text strong>Created Date:</Text></Col>
        <Col span={18}>{moment(new Date(this.props.task.createdDate), "YYYY-MM-DD").format("dddd, MMMM DD YYYY")}</Col>
        <Col span={6}><Text strong>Due Date:</Text></Col>
        <Col span={18}>{moment(new Date(this.props.task.dueDate), "YYYY-MM-DD").format("dddd, MMMM DD YYYY")}</Col>
        <Col span={6}><Text strong>Updated Date:</Text></Col>
        <Col span={18} style={{ marginBottom: '10px' }}>{this.props.task.updatedDate ? moment(new Date(this.props.task.updatedDate), "YYYY-MM-DD").format("dddd, MMMM DD YYYY") : "No updates"}</Col>
        <Col span={6}><Text strong>State:</Text></Col>
        <Col span={18}>{
          this.props.task.isDone ? <Tag color="#87d068">Done</Tag> : <Tag color="#d0d0d0">Not Done</Tag>
        }</Col>
      </Row>
    )
  }

}


var mapStateToProps = ({ todos }) => {
  return {
  };
};

var mapDispatchToProps = function (dispatch) {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTask);