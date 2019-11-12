import {
  INCRENENT_MISTAKES,
  INCREMENT_STEP,
  RESET_GAME,
} from './consts/actionTypes.js';

const initialState = {
  step: -1,
  mistakes: 0,
};

export default (state = initialState, {payload, type}) => {
  switch (type) {
    case INCRENENT_MISTAKES:
      return {
        ...state,
        mistakes: state.mistakes + payload,
      };
    case INCREMENT_STEP:
      return {
        ...state,
        step: state.step + 1,
      };
    case RESET_GAME:
      return initialState;
    default: return state;
  }
};

