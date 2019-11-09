import {createActions} from 'redux-actions';

import {
  INCREASE_MISTAKES,
  NEXT_QUESTION,
} from './consts/actionTypes.js';

export default createActions({
  [INCREASE_MISTAKES]: () => {},
  [NEXT_QUESTION]: () => {},
});
