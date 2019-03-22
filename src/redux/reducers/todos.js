import { defineAction } from 'redux-define';
import _ from "underscore";

var DEFAULT_STATE = {
  tasks: [
    {
      id: "34647b27-8b6c-45df-ad30-90d640e53903",
      subject: "Make MAMA noodle",
      description: "yummy yummy",
      createdDate: 1553235594540,
      dueDate: 1553274000000,
      updatedDate: null,
      isDone: true
    }
  ]
}

export var ACTIONS = defineAction('LOG', [
  'ADD_TASK',
  'DELETE_TASK',
  'EDIT_TASK'
]);

export var actions = {
  addTask: (task) => {
    return {
      type: ACTIONS.ADD_TASK,
      payload: task
    }
  },
  deleteTask: (task) => {
    return {
      type: ACTIONS.DELETE_TASK,
      payload: task
    }
  },
  editTask: (task) => {
    return {
      type: ACTIONS.EDIT_TASK,
      payload: task
    }
  },

}

export default function (state = DEFAULT_STATE, { type, payload }) {
  let newState = _.extend({}, state);

  let tasks, task, tempTask;
  switch (type) {
    case ACTIONS.ADD_TASK:
      tasks = _.map(newState.tasks, (task) => { return task })
      tasks.push(payload)
      newState.tasks = tasks
      break;
    case ACTIONS.DELETE_TASK:
      tasks = _.map(newState.tasks, (task) => { return task })
      tempTask = tasks.filter((val) => { return val.id === payload.id })
      task = tempTask.length > 0 ? tempTask[0] : null
      if (task) {
        let idxTask = newState.tasks.indexOf(task)
        tasks.splice(idxTask, 1)
      }
      newState.tasks = tasks
      break;
    case ACTIONS.EDIT_TASK:
      tasks = _.map(newState.tasks, (task) => { return task })
      tempTask = tasks.filter((val) => { return val.id === payload.id })
      task = tempTask.length > 0 ? tempTask[0] : null
      if (task) {
        let idxTask = newState.tasks.indexOf(task)
        tasks.splice(idxTask, 1, payload)
      }
      newState.tasks = tasks
      break;
    default:
      return state;
  }

  return newState;
};