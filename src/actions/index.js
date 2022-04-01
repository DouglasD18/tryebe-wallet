import fetchCurrence from '../funcs/fetchCurrence';

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCE = 'ADD_CURRECE';

export const addEmailValue = (value) => ({ type: ADD_EMAIL, value });
export const addCurrence = (value) => ({ type: ADD_CURRENCE, value });

export function dispatchCurrence() {
  return async (dispatch) => {
    const response = await fetchCurrence();
    dispatch(addCurrence(response));
  };
}
