import {createActions} from 'redux-actions';

import {QUESTION_TYPE} from './consts/index.js';

import {
  INCRENENT_MISTAKES,
  INCREMENT_STEP,
  RESET_GAME,
} from './consts/actionTypes.js';

const isArtistAnswerCorrect = (userAnswer, question) => {
  return userAnswer === question.song.artist;
};

const isArtistGenreCorrect = (userAnswer, question) => {
  return userAnswer.every((element) => element === question.genre);
};

export default createActions({
  [INCRENENT_MISTAKES]: (userAnswer, question, mistakes, maxMistakes) => {
    let answerIsCorrect;

    switch (question.type) {
      case (QUESTION_TYPE.ARTIST):
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
      case (QUESTION_TYPE.GENRE):
        answerIsCorrect = isArtistGenreCorrect(userAnswer, question);
        break;
    }

    if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: RESET_GAME,
      };
    }

    return {
      type: INCRENENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },
  [INCREMENT_STEP]: () => {},
});
