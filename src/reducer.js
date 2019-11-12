import {
  INCREASE_MISTAKES,
  INCREMENT_STEP,
  RESET_GAME,
} from './consts/actionTypes.js';

const initialState = {
  mistakes: 0,
  currentQuestion: -1,
};

export default (state = initialState, {payload, type}) => {
  switch (type) {
    case INCREASE_MISTAKES:
      return {
        ...state,
        mistakes: state.mistakes + payload,
      };
    case INCREMENT_STEP:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };
    case RESET_GAME:
      return initialState;
    default: return state;
  }
};

