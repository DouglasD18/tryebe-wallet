import { ADD_EMAIL } from '../actions';

const INITAL_STATE = {
  email: '',
};

function user(state = INITAL_STATE, actions) {
  switch (actions.type) {
  case ADD_EMAIL:
    return {
      ...state,
      email: actions.value,
    };
  default:
    return state;
  }
}

export default user;
