import { fetchCurrence, fetchCotation } from '../funcs';

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCE = 'ADD_CURRECE';
export const ADD_COTATION = 'ADD_COTATION';
export const EXCLUD_EXPENSE = 'EXCLUD_EXPENSE';
export const EDIT = 'EDIT';
export const NEW_ID = 'NEW_ID';
export const EDITED = 'EDITED';

export const addEmailValue = (value) => ({ type: ADD_EMAIL, value });
export const addCurrence = (value) => ({ type: ADD_CURRENCE, value });
export const addCotation = (expense) => ({ type: ADD_COTATION, expense });
export const excludExpense = (expenses) => ({ type: EXCLUD_EXPENSE, expenses });
export const edit = (value) => ({ type: EDIT, value });
export const newId = (id) => ({ type: NEW_ID, id });
export const editExpenses = (expensesEdited) => ({ type: EDITED, expensesEdited });

export function dispatchCurrence() {
  return async (dispatch) => {
    const response = await fetchCurrence();
    dispatch(addCurrence(response));
  };
}

export function dispatchCotation(state) {
  return async (dispatch) => {
    const response = await fetchCotation();
    console.log(response);
    const responseObject = {
      exchangeRates: response,
    };
    const currency = { ...state, ...responseObject };
    dispatch(addCotation(currency));
  };
}

export function toEditExpenses(state, expenses, id) {
  const edited = expenses.map((expense) => {
    if (expense.id === id) {
      const exchangeObject = {
        exchangeRates: expense.exchangeRates,
      };
      const currency = { ...state, ...exchangeObject };
      return currency;
    }
    return expense;
  });
  return (dispatch) => {
    dispatch(editExpenses(edited));
  };
}
