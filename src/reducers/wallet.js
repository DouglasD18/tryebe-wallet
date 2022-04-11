import { ADD_CURRENCE, ADD_COTATION, EXCLUD_EXPENSE, EDITED } from '../actions';

const INITAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITAL_STATE, actions) {
  switch (actions.type) {
  case ADD_CURRENCE:
    return {
      ...state,
      currencies: actions.value,
    };
  case ADD_COTATION:
    return {
      ...state,
      expenses: [...state.expenses, actions.expense],
    };
  case EXCLUD_EXPENSE:
    return {
      ...state,
      expenses: ([...actions.expenses]),
    };
  case EDITED:
    return {
      ...state,
      expenses: ([...actions.expensesEdited]),
    };
  default:
    return state;
  }
}

export default wallet;
