import { handleActions } from 'redux-actions';

import { lunchesLoaded } from '../actions/lunch';

const getLunch = (lunches, day) => {
    const returnValue = [];
    for(const lunch of lunches) {
      for(const lunchItem of lunch.lunchItems) {
        if(lunchItem.day === day || lunchItem.day === null || lunchItem.day === undefined) {
          let found = false;
          for(const restaurant of returnValue) {
            if(restaurant.name === lunch.restaurant) {
              found = true;
              restaurant.items = restaurant.items.concat(lunchItem.items);
            }
          }
          if(!found) {
            returnValue.push({name: lunch.restaurant, items: lunchItem.items});
          }
        }
      }
    }
    return returnValue;
  }

export const lunches = handleActions({
    [lunchesLoaded]: (state, { payload }) => {

      return {
        ...state,
        lunches: payload.lunches,
        0: getLunch(payload.lunches, 0),
        1: getLunch(payload.lunches, 1),
        2: getLunch(payload.lunches, 2),
        3: getLunch(payload.lunches, 3),
        4: getLunch(payload.lunches, 4)
      }
    }
}, {lunches: []});
