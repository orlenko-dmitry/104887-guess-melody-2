import {
  INCREASE_MISTAKES,
  NEXT_QUESTION,
} from './consts/actionTypes.js';

const initialState = {
  mistakes: 0,
  currentQuestion: -1,
};

export default (state = initialState, {type}) => {
  switch (type) {
    case INCREASE_MISTAKES:
      return {
        ...state,
        mistakes: state.mistakes + 1,
      };
    case NEXT_QUESTION:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
      };
    default: return state;
  }
};

