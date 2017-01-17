import { createAction } from 'redux-actions';
import axios from 'axios';

export const lunchesLoaded = createAction('LUNCHES_LOADED', lunches => ({ lunches }));
export function getLunches() {
  return dispatch => axios
      .get('api/lunch')
      .then((response) => {
        dispatch(lunchesLoaded(response.data));
      });
}