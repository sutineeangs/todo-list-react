import { defineAction } from 'redux-define';
import _ from "underscore";

var DEFAULT_STATE = {
  tasks: [
    {
      id: "24647b27-8b6c-45df-ad30-90d640e53903",
      subject: "Research Geo-Political History",
      description: "Review of my book 'Ukraine and Russian Neo-Imperialism: The Divergent Break' by Francesco Trupia. The review was published in Eastern European Politics (https://www.tandfonline.com/doi/full/10.1080/21599165.2019.1573728) on March 8, 2019.",
      createdDate: 1553235594540,
      dueDate: 1553274000000,
      updatedDate: null,
      isDone: false
    },
    {
      id: "34647b27-8b6c-45df-ad30-90d640e53903",
      subject: "Research Climate, Flora & Fauna",
      description: "The climate of Lake Pfäffikon during the Swiss Neolithic had a profound effect on the availability of plants, animals, and other natural resources at Robenhausen and nearby lake dwellings sites.",
      createdDate: 1553235594540,
      dueDate: 1553385600000,
      updatedDate: null,
      isDone: false
    },
    {
      id: "44647b27-8b6c-45df-ad30-90d640e53903",
      subject: "Research Main Industries",
      description: "There are several factors that will determine the availability of industry information.",
      createdDate: 1553235594540,
      dueDate: 1553472000000,
      updatedDate: null,
      isDone: false
    },
    {
      id: "54647b27-8b6c-45df-ad30-90d640e53903",
      subject: "Write Section 1 - Overview",
      description: "",
      createdDate: 1553235594540,
      dueDate: 1553558400000,
      updatedDate: null,
      isDone: false
    },
    {
      id: "64647b27-8b6c-45df-ad30-90d640e53903",
      subject: "Write Section 2 - History",
      description: "",
      createdDate: 1553235594540,
      dueDate: 1553558400000,
      updatedDate: null,
      isDone: false
    },
    {
      id: "74647b27-8b6c-45df-ad30-90d640e53903",
      subject: "Write Section 3 - Environmental Challenges",
      description: "",
      createdDate: 1553235594540,
      dueDate: 1553644800000,
      updatedDate: null,
      isDone: false
    },
    {
      id: "84647b27-8b6c-45df-ad30-90d640e53903",
      subject: "Write Section 4 - Socio-Political Challenges",
      description: "",
      createdDate: 1553235594540,
      dueDate: 1553644800000,
      updatedDate: null,
      isDone: false
    },
    {
      id: "94647b27-8b6c-45df-ad30-90d640e53903",
      subject: "Write Section 5 - Analysis and Conclusion",
      description: "",
      createdDate: 1553235594540,
      dueDate: 1553731200000,
      updatedDate: null,
      isDone: false
    },
    {
      id: "05647b27-8b6c-45df-ad30-90d640e53903",
      subject: "Present Project",
      description: "",
      createdDate: 1553235594540,
      dueDate: 1553904000000,
      updatedDate: null,
      isDone: false
    },
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