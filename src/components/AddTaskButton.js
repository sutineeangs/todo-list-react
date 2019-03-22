import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as todosActions } from '../redux/reducers/todos';

import moment from 'moment';
import { Row, Col, Button, Typography, Modal, Input, DatePicker, notification } from 'antd';
const { Text } = Typography;
const { TextArea } = Input;
const uuidv4 = require('uuid/v4');
notification.config({
  placement: "bottomRight",
});

class AddTaskButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      id: null,
      subject: null,
      description: null,
      createdDate: null,
      dueDate: null,
    }

    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.onChangeSubject = this.onChangeSubject.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeCreatedDate = this.onChangeCreatedDate.bind(this)
    this.onChangeDueDate = this.onChangeDueDate.bind(this)
  }

  showModal() {
    this.setState({
      id: uuidv4(),
      subject: "",
      description: "",
      createdDate: moment(new Date(), "YYYY-MM-DD"),
      dueDate: moment(new Date(), "YYYY-MM-DD")
    })
    this.setState({ visible: true })
  }

  handleOk(e) {
    let task = {
      id: this.state.id,
      subject: this.state.subject,
      description: this.state.description,
      createdDate: this.state.createdDate ? this.state.createdDate.valueOf() : null,
      dueDate: this.state.dueDate ? this.state.dueDate.valueOf() : null,
      updatedDate: null,
      isDone: false
    }
    if (task.subject === "" || task.createdDate === null || task.dueDate === null) { return }
    this.props.addTask(task);
    this.handleCancel()
    notification["success"]({
      message: `Task#${task.subject}`,
      description: 'add a task success',
    });
  }

  handleCancel(e) {
    this.setState({
      visible: false,
      id: null,
      subject: null,
      description: null,
      createdDate: moment(new Date(), "YYYY-MM-DD"),
      dueDate: moment(new Date(), "YYYY-MM-DD"),
    });
  }

  onChangeSubject(e) {
    this.setState({ subject: e.target.value })
  };

  onChangeDescription(e) {
    this.setState({ description: e.target.value })
  };

  onChangeCreatedDate(date, dateString) {
    if (date) {
      this.setState({ createdDate: date })
    } else {
      this.setState({ createdDate: null })
    }
  }

  onChangeDueDate(date, dateString) {
    if (date) {
      this.setState({ dueDate: date })
    } else {
      this.setState({ dueDate: null })
    }
  }

  render() {
    return <div>
      <Button type="primary" shape="circle" icon="plus" size={'large'}
        onClick={this.showModal} />

      <Modal
        title="Create Task"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} ><Text strong>ID</Text></Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} style={{ marginBottom: '10px' }}>
            <Text strong>{this.state.id}</Text>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} ><Text strong>Subject</Text></Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} style={{ marginBottom: '10px' }}>
            <Input placeholder="enter subject" allowClear onChange={this.onChangeSubject} value={this.state.subject} />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}><Text strong>Description</Text></Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} style={{ marginBottom: '10px' }}>
            <TextArea placeholder="enter description" rows={2} onChange={this.onChangeDescription} value={this.state.description} />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}><Text strong>Created Date</Text></Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} style={{ marginBottom: '10px' }}>
            <DatePicker value={this.state.createdDate} onChange={this.onChangeCreatedDate} />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}><Text strong>Due Date</Text></Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} style={{ marginBottom: '10px' }}>
            <DatePicker value={this.state.dueDate} onChange={this.onChangeDueDate} />
          </Col>
        </Row>
      </Modal>
    </div>
  }
}

var mapStateToProps = ({ todos }) => {
  return {
  };
};

var mapDispatchToProps = function (dispatch) {
  return {
    addTask: function (task) {
      return dispatch(todosActions.addTask(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskButton);