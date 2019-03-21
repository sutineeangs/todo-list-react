import {  defineAction } from 'redux-define';
import _ from "underscore";

var DEFAULT_STATE = {
  tabs: 'messages',
  page: null
}

export var ACTIONS = defineAction('LOG', [
  'CLICKED', 
  'ON_PAGE'
]);
export var actions = {
  clickedTab: (key) => {
    return {
      type: ACTIONS.CLICKED,
      payload: {
        activeKey: key
      }
    }
  },
  onPage: (page) => {
    return {
      type: ACTIONS.ON_PAGE,
      payload: {
        page: page
      }
    }
  }
 
}

export default function (state = DEFAULT_STATE, { type, payload }) {
  let newState = _.extend({}, state);
  
  switch (type) {
    case ACTIONS.CLICKED:
      newState.tabs = payload.activeKey
      break;
    case ACTIONS.ON_PAGE:
      newState.page = payload.page
      break;
    default:
      return state;
  }

  return newState;
};