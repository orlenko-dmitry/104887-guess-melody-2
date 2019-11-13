import {QUESTION_TYPE} from './consts/index.js';

import {
  INCRENENT_MISTAKES,
  INCREMENT_STEP,
  RESET_GAME,
  INCREMENT_TIME,
} from './consts/actionTypes.js';

const isArtistAnswerCorrect = (userAnswer, question) => {
  return userAnswer === question.song.artist;
};

const isArtistGenreCorrect = (userAnswer, question) => {
  return userAnswer.every((item) => item === question.genre) &&
  question.answers.filter((item) => item.genre === question.genre).length === userAnswer.length;
};

export default ({
  incrementMistakes: ({userAnswer, question, mistakes, maxMistakes}) => {
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

  incrementStep: ({step, questionsQuantity}) => {
    if (step >= questionsQuantity - 1) {
      return {
        type: RESET_GAME,
      };
    }
    return {
      type: INCREMENT_STEP,
      payload: 1,
    };
  },

  incrementTime: () => {
    return {
      type: INCREMENT_TIME,
      payload: 1,
    };
  },

  resetGame: () => {
    return {
      type: RESET_GAME,
    };
  }
});
