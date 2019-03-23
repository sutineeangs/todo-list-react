import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { List, Icon, Typography } from 'antd';
const { Text } = Typography;


class FinishedTask extends Component {

  render() {
    return (
      <List
        className="finish-header"
        size="small"
        header={<div style={{ fontWeight: 'bold' }}>Finished Tasks</div>}
        bordered
        dataSource={this.props.tasks}
        renderItem={item => (<List.Item>
          <Icon type="check" style={{color: 'green'}} /> {item.subject} <Text style={{float: 'right', color: '#c3c3c3'}}>{moment(item.dueDate).format("YYYY-MM-DD")}</Text>
        </List.Item>)}
      />
    )
  }

}


var mapStateToProps = ({ todos }) => {
  return {
    tasks: todos.tasks.filter((v) => {
      return v.isDone
    })
  };
}

var mapDispatchToProps = function (dispatch) {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishedTask);