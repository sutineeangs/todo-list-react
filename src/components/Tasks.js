import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as todosActions } from '../redux/reducers/todos';

import AddTaskButton from "./AddTaskButton"
import EditTaskForm from "./EditTaskForm"

import _ from "underscore";
import moment from 'moment';
import { Layout, Row, Col, Table, Typography, Divider, Icon, Tag, Checkbox } from 'antd';
const { Content } = Layout;
const { Text } = Typography;



class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.onChangeIsDone = this.onChangeIsDone.bind(this)
  }

  onChangeIsDone(e, oldTask) {
    let task = _.extend({}, oldTask, { isDone: e.target.checked, updatedDate: moment(new Date(), "YYYY-MM-DD").valueOf() })
    this.props.editTask(task)    
  }

  renderExpandedRow(data) {
    return (
      <Row gutter={16}>
        <Col span={6}><Text strong>ID:</Text></Col>
        <Col span={18}>{data.id}</Col>
        <Col span={6}><Text strong>Description:</Text></Col>
        <Col span={18}>{data.description}</Col>
        <Col span={6}><Text strong>Created Date:</Text></Col>
        <Col span={18}>{moment(new Date(data.createdDate), "YYYY-MM-DD").format("dddd, MMMM DD YYYY")}</Col>
        <Col span={6}><Text strong>Due Date:</Text></Col>
        <Col span={18}>{moment(new Date(data.dueDate), "YYYY-MM-DD").format("dddd, MMMM DD YYYY")}</Col>
        <Col span={6}><Text strong>Updated Date:</Text></Col>
        <Col span={18} style={{ marginBottom: '10px' }}>{data.updatedDate ? moment(new Date(data.updatedDate), "YYYY-MM-DD").format("dddd, MMMM DD YYYY") : "No updates"}</Col>
        <Col span={6}><Text strong>State:</Text></Col>
        <Col span={18}>{
          data.isDone ? <Tag color="#87d068">Done</Tag> : <Tag color="#d0d0d0">Not Done</Tag>
        }</Col>
      </Row>
    )
  }

  render() {
    let me = this
    const columns = [
      {
        title: '', dataIndex: 'isDone', key: 'isDone', render: (text, record) => {
          return <Checkbox defaultChecked={record.isDone} onChange={(e)=>{me.onChangeIsDone(e, record)}}></Checkbox>
        }
      },
      { title: 'Subject', dataIndex: 'subject', key: 'subject' },
      {
        title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate', sorter: true, render: (text, record) => {
          return moment(new Date(record.dueDate), "YYYY-MM-DD").format("dddd, MMMM DD YYYY")
        }
      },
      {
        title: 'Action', dataIndex: '', key: 'x', render: (text, record) => {
          return (
            <span>
              <EditTaskForm task={record} />
              <Divider type="vertical" />
              <a href="#delete" onClick={() => { me.props.deleteTask(record) }}><Icon type="delete" /></a>
            </span>
          )
        },
      },
    ];

    return (
      <Content style={{ margin: '16px' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}><AddTaskButton /></Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={this.props.tasks}
                pagination={{ pageSize: 5 }}
                expandedRowRender={record => this.renderExpandedRow(record)}
              />
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}


var mapStateToProps = ({ todos }) => {
  console.log(todos.tasks)
  return {
    tasks: todos.tasks,
  };
};

var mapDispatchToProps = function (dispatch) {
  return {
    deleteTask: function (task) {
      return dispatch(todosActions.deleteTask(task));
    },
    editTask: function (task) {
      return dispatch(todosActions.editTask(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);