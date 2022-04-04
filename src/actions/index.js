import { fetchCurrence, fetchCotation } from '../funcs';

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCE = 'ADD_CURRECE';
export const ADD_COTATION = 'ADD_COTATION';

export const addEmailValue = (value) => ({ type: ADD_EMAIL, value });
export const addCurrence = (value) => ({ type: ADD_CURRENCE, value });
export const addCotation = (expense) => ({ type: ADD_COTATION, expense });

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
