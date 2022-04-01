import { ADD_CURRENCE } from '../actions';

const INITAL_STATE = {
  currencies: [],
};

function wallet(state = INITAL_STATE, actions) {
  switch (actions.type) {
  case ADD_CURRENCE:
    return {
      ...state,
      currencies: actions.value,
    };
  default:
    return state;
  }
}

export default wallet;
