import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as todosActions } from '../redux/reducers/todos';

import moment from 'moment';
import { Row, Col, Typography, Modal, Input, DatePicker, Icon, Checkbox, notification } from 'antd';
const { Text } = Typography;
const { TextArea } = Input;
notification.config({
  placement: "bottomRight",
});

class EditTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      id: null,
      subject: null,
      description: null,
      createdDate: null,
      dueDate: null,
      isDone: false
    }

    this.showModal = this.showModal.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.onChangeSubject = this.onChangeSubject.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeCreatedDate = this.onChangeCreatedDate.bind(this)
    this.onChangeDueDate = this.onChangeDueDate.bind(this)
    this.onChangeIsDone = this.onChangeIsDone.bind(this)
  }

  showModal() {
    this.setState({
      id: this.props.task.id,
      subject: this.props.task.subject,
      description: this.props.task.description,
      createdDate: moment(new Date(this.props.task.createdDate), "YYYY-MM-DD"),
      dueDate: moment(new Date(this.props.task.dueDate), "YYYY-MM-DD"),
      isDone: this.props.task.isDone
    })
    this.setState({ visible: true })
  }

  handleOk(e) {
    let task = {
      id: this.state.id,
      subject: this.state.subject,
      description: this.state.description,
      createdDate: this.state.createdDate ? this.state.createdDate.valueOf() : this.props.task.createdDate,
      dueDate: this.state.dueDate ? this.state.dueDate.valueOf() : this.props.task.dueDate,
      updatedDate: moment(new Date(), "YYYY-MM-DD").valueOf(),
      isDone: this.state.isDone
    }
    if (task.subject === "" || task.createdDate === null || task.dueDate === null) { return }
    this.props.editTask(task);
    this.handleCancel()
    notification["success"]({
      message: `Task#${task.subject}`,
      description: 'edit a task success',
    });
  }

  handleCancel(e) {
    this.setState({
      visible: false,
      id: null,
      subject: null,
      description: null,
      createdDate: null,
      dueDate: null,
      isDone: false
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

  onChangeIsDone(e) {
    this.setState({ isDone: e.target.checked })
  }

  render() {
    return (<div style={{ display: 'initial' }} >
      <a href="#edit" onClick={this.showModal}><Icon type="edit" /></a>
      <Modal
        title="Edit Task"
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
            <DatePicker defaultValue={this.state.createdDate} onChange={this.onChangeCreatedDate} disabled />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}><Text strong>Due Date</Text></Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} style={{ marginBottom: '15px' }}>
            <DatePicker defaultValue={this.state.dueDate} onChange={this.onChangeDueDate} value={this.state.dueDate} />
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}><Text strong>{" "}</Text></Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} style={{ marginBottom: '10px' }}>
            <Checkbox checked={this.state.isDone} onChange={this.onChangeIsDone}>Done</Checkbox>
          </Col>
        </Row>
      </Modal>
    </div>
    )
  }
}

var mapStateToProps = ({ todos }) => {
  return {
  };
};

var mapDispatchToProps = function (dispatch) {
  return {
    editTask: function (task) {
      return dispatch(todosActions.editTask(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskForm);