import { EDIT, NEW_ID } from '../actions';

const INITAL_STATE = {
  verify: false,
  id: 0,
};

function edit(state = INITAL_STATE, action) {
  switch (action.type) {
  case EDIT:
    return {
      ...state,
      verify: !action.value,
    };
  case NEW_ID:
    return {
      ...state,
      id: action.id,
    };
  default:
    return state;
  }
}

export default edit;
