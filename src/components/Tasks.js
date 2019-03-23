import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as todosActions } from '../redux/reducers/todos';

import AddTaskButton from "./AddTaskButton"
import EditTaskForm from "./EditTaskForm"
import DetailTask from "./DetailTask"

import _ from "underscore";
import moment from 'moment';
import { Layout, Row, Col, Table, Divider, Icon, Checkbox, Progress, Input } from 'antd';
const { Content } = Layout;
const Search = Input.Search;

class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: ""
    }
    this.onChangeIsDone = this.onChangeIsDone.bind(this)
  }

  onChangeIsDone(e, oldTask) {
    let task = _.extend({}, oldTask, { isDone: e.target.checked, updatedDate: moment(new Date(), "YYYY-MM-DD").valueOf() })
    this.props.editTask(task)
  }

  getDoneTaskPercent() {
    let n = this.props.tasks.length
    let s = this.props.tasks.filter((v) => { return v.isDone }).length
    return parseFloat(((s / n) * 100).toFixed(2))
  }

  getTasks() {
    let tasks = []
    let filter = this.state.search
    if (filter === null || filter === "") {
      tasks = _.map(this.props.tasks, (v) => { return v })
    }else{
      tasks = this.props.tasks.filter((v)=>{
        let subject = v.subject.toLowerCase()
        let dueDate = moment(new Date(v.dueDate), "YYYY-MM-DD").format("dddd, MMMM DD YYYY").toLowerCase()
        return (subject.indexOf(filter) > -1) || (dueDate.indexOf(filter) > -1)
      })
    }
    return tasks
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
                <Search
                  placeholder="search by subject / due date"
                  onSearch={value => me.setState({ search: value.toLowerCase() })}
                  style={{ width: 300, marginRight: 20 }}
                />
                <AddTaskButton />
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: '0px 15px 15px 15px' }} >
              <Progress percent={this.getDoneTaskPercent()} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={this.getTasks()}
                pagination={{ pageSize: 8 }}
                expandedRowRender={record => <DetailTask task={record} />}
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