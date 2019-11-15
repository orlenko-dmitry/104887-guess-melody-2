import {
  INCREMENT_MISTAKES,
  INCREMENT_STEP,
  INCREMENT_TIME,
  RESET_GAME,
} from './consts/actionTypes.js';

const initialState = {
  step: -1,
  mistakes: 0,
  currentTime: 0,
};

export default (state = initialState, {payload, type}) => {
  switch (type) {
    case INCREMENT_MISTAKES:
      return {
        ...state,
        mistakes: state.mistakes + payload,
      };
    case INCREMENT_STEP:
      return {
        ...state,
        step: state.step + payload,
      };
    case INCREMENT_TIME:
      return {
        ...state,
        currentTime: state.currentTime + payload,
      };
    case RESET_GAME:
      return initialState;
    default: return state;
  }
};

