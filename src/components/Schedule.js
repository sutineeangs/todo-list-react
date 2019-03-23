import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'underscore';
import moment from 'moment';
import { Calendar, Badge, Popover } from 'antd';


class Schedule extends Component {

  constructor(props) {
    super(props);

    this.dateCellRender = this.dateCellRender.bind(this)
  }

  setBadgeStyle(event) {
    let status = "default"
    let today = moment()
    let dueDate = moment(new Date(event.dueDate))
    if (dueDate.isSame(today, 'date')) {
      status = "processing"
    }
    if (event.isDone) { status = "success" }
    return status
  }

  dateCellRender(value) {
    let listData = this.getListData(value);
    return (
      <ul className="events">
        {
          listData.map(item => (
            <Popover key={item.id} content={item.subject} title={moment(new Date(item.dueDate), "YYYY-MM-DD").format("dddd, MMMM DD YYYY")}>
              <li >
                <Badge status={this.setBadgeStyle(item)} text={item.subject} />
              </li>
            </Popover>
          ))
        }
      </ul>
    );
  }

  getListData(value) {
    let listData;
    let events = this.props.tasks.filter((task) => {
      let dueDate = moment(new Date(task.dueDate))
      return dueDate.isSame(value, 'date')
    })
    listData = _.map(events, (v) => { return v })
    return listData || [];
  }

  render() {
    return (
      <Calendar dateCellRender={this.dateCellRender} />
    )
  }

}


var mapStateToProps = ({ todos }) => {
  return {
    tasks: todos.tasks
  };
};

var mapDispatchToProps = function (dispatch) {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);