import { defineAction } from 'redux-define';
import _ from "underscore";


var DEFAULT_STATE = {
  tasks: []
}

export var ACTIONS = defineAction('LOG', [
  'SET_TASKS',
  'ADD_TASK',
  'DELETE_TASK',
  'EDIT_TASK'
]);

export var actions = {
  setTasks: (tasks) => {
    return {
      type: ACTIONS.SET_TASKS,
      payload: tasks
    }
  },
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
    case ACTIONS.SET_TASKS:
      newState.tasks = payload
      break;
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