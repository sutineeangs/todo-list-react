import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { List, Icon } from 'antd';



class Today extends Component {

  render() {
    return (
      <List
        className="today-header"
        size="small"
        header={<div style={{ fontWeight: 'bold' }}>Today!  {moment().format("dddd, MMMM DD YYYY")}</div>}
        bordered
        dataSource={this.props.tasks}
        renderItem={item => (<List.Item>
          <Icon type="alert" theme="twoTone" twoToneColor="#faad14" /> {item.subject} {
            item.isDone? <Icon type="check" style={{color: 'green'}} />: ""
          }
        </List.Item>)}
      />
    )
  }

}


var mapStateToProps = ({ todos }) => {
  let today = moment()
  return {
    tasks: todos.tasks.filter((v) => {
      let dueDate = moment(new Date(v.dueDate))
      return dueDate.isSame(today, 'date')
    })
  };
}

var mapDispatchToProps = function (dispatch) {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Today);