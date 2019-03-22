import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as todosActions } from '../redux/reducers/todos';

import AddTaskButton from "./AddTaskButton"
import EditTaskForm from "./EditTaskForm"
import DetailTask from "./DetailTask"

import _ from "underscore";
import moment from 'moment';
import { Layout, Row, Col, Table, Divider, Icon, Checkbox, Progress } from 'antd';
const { Content } = Layout;


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

  getDoneTaskPercent(){
    let n = this.props.tasks.length
    let s = this.props.tasks.filter((v)=>{ return v.isDone }).length
    return (s/n)*100
  }

  render() {
    let me = this
    const columns = [
      {
        title: '', dataIndex: 'isDone', key: 'isDone', render: (text, record) => {
          return <Checkbox checked={record.isDone} onChange={(e) => { me.onChangeIsDone(e, record) }}></Checkbox>
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
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div style={{ marginBottom: '20px', float: 'right', display: 'flex', flexDirection: 'row' }}>
                <AddTaskButton />
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{padding: '0px 15px 15px 15px'}} >
              <Progress percent={this.getDoneTaskPercent()} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={this.props.tasks}
                pagination={{ pageSize: 5 }}
                expandedRowRender={record => <DetailTask task={record}/>}
              />
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
    deleteTask: function (task) {
      return dispatch(todosActions.deleteTask(task));
    },
    editTask: function (task) {
      return dispatch(todosActions.editTask(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);