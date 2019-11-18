import reducer from './reducer.js';
import actions, {isArtistAnswerCorrect, isGenreAnswerCorrect} from './actions.js';
import {
  INCREMENT_STEP,
  INCREMENT_MISTAKES,
  INCREMENT_TIME,
  RESET_GAME,
} from './consts/actionTypes.js';
import {GAME_SETTINGS} from './consts/index.js';

describe(`Business logic is correct`, () => {
  it(`Artist answer is checked correctly`, () => {
    expect(isArtistAnswerCorrect({
      userAnswer: `correct-artist`,
      question: {
        type: `artist`,
        song: {
          artist: `correct-artist`,
          src: ``,
        },
        answers: [
          {
            artist: `incorrect-artist`,
            picture: `incorrect-pic`,
          },
          {
            artist: `correct-artist`,
            picture: `correct-pic`,
          },
          {
            artist: `incorrect-artist-2`,
            picture: `incorrect-pic`,
          },
        ],
      },
    })).toBe(true);

    expect(isArtistAnswerCorrect({
      userAnswer: `incorrect-artist`,
      question: {
        type: `artist`,
        song: {
          artist: `correct-artist`,
          src: ``,
        },
        answers: [
          {
            artist: `incorrect-artist`,
            picture: `incorrect-pic`,
          },
          {
            artist: `correct-artist`,
            picture: `correct-pic`,
          },
          {
            artist: `incorrect-artist-2`,
            picture: `incorrect-pic`,
          },
        ],
      },
    })).toBe(false);
  });

  it(`Genre question is checked correctly`, () => {
    expect(isGenreAnswerCorrect({
      userAnswer: [`jazz`, `jazz`],
      question: {
        type: `genre`,
        genre: `jazz`,
        answers: [
          {
            genre: `jazz`,
            src: `0`,
          },
          {
            genre: `blues`,
            src: `1`,
          },
          {
            genre: `rock`,
            src: `2`,
          },
          {
            genre: `jazz`,
            src: `3`,
          },
        ],
      },
    })).toEqual(true);


    expect(isGenreAnswerCorrect({
      userAnswer: [`jazz`, `rock`],
      question: {
        type: `genre`,
        genre: `jazz`,
        answers: [
          {
            genre: `jazz`,
            src: `0`,
          },
          {
            genre: `jazz`,
            src: `1`,
          },
          {
            genre: `rock`,
            src: `2`,
          },
          {
            genre: `blues`,
            src: `3`,
          },
        ],
      },
    })).toEqual(false);
  });

  expect(isGenreAnswerCorrect({
    userAnswer: [],
    question: {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `jazz`,
          src: `0`,
        },
        {
          genre: `jazz`,
          src: `1`,
        },
        {
          genre: `rock`,
          src: `2`,
        },
        {
          genre: `blues`,
          src: `3`,
        },
      ],
    },
  })).toEqual(false);
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(actions.incrementMistakes({
      userAnswer: `correct`,
      question: {
        type: `artist`,
        song: {
          artist: `correct`,
          src: ``,
        },
        answers: [
          {
            artist: `correct`,
            picture: ``,
          },
          {
            artist: `incorrect`,
            picture: ``,
          },
          {
            artist: `incorrect-2`,
            picture: ``,
          },
        ],
      },
    })).toEqual({
      type: INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(actions.incrementMistakes({
      userAnswer: `incorrect`,
      question: {
        type: `artist`,
        song: {
          artist: `correct`,
          src: ``,
        },
        answers: [
          {
            artist: `correct`,
            picture: ``,
          },
          {
            artist: `incorrect`,
            picture: ``,
          },
          {
            artist: `incorrect-2`,
            picture: ``,
          },
        ],
      },
    })).toEqual({
      type: INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistakes reset aplication state,
        if answer is incorrect and mistakes will equel maxMistakes`, () => {
    expect(actions.incrementMistakes({
      userAnswer: `incorrect`,
      question: {
        type: `artist`,
        song: {
          artist: `correct`,
          src: ``,
        },
        answers: [
          {
            artist: `correct`,
            picture: ``,
          },
          {
            artist: `incorrect`,
            picture: ``,
          },
          {
            artist: `incorrect-2`,
            picture: ``,
          },
        ],
      },
      mistakes: 2,
      maxMistakes: 3,
    })).toEqual({
      type: RESET_GAME,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(actions.incrementMistakes({
      userAnswer: [`jazz`],
      question: {
        type: `genre`,
        genre: `jazz`,
        answers: [
          {
            genre: `rock`,
            src: ``,
          },
          {
            genre: `jazz`,
            src: ``,
          },
          {
            genre: `blues`,
            src: ``,
          },
          {
            genre: `blues`,
            src: ``,
          },
        ],
      },
    })).toEqual({
      type: INCREMENT_MISTAKES,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(actions.incrementMistakes({
      userAnswer: [`blues`, `rock`],
      question: {
        type: `genre`,
        genre: `jazz`,
        answers: [
          {
            genre: `jazz`,
            src: ``,
          },
          {
            genre: `blues`,
            src: ``,
          },
          {
            genre: `rock`,
            src: ``,
          },
          {
            genre: `blues`,
            src: ``,
          },
        ],
      },
    })).toEqual({
      type: INCREMENT_MISTAKES,
      payload: 1,
    });
  });

  it(`Action creator for incrementing step return action with 1 payload,
      if step less than questionsQuantity`, () => {
    expect(actions.incrementStep({
      step: 1,
      questionsQuantity: 2,
    })).toEqual({
      type: INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`Action creator for incrementing step reset application state,
      if step not less than questionsQuantity`, () => {
    expect(actions.incrementStep({
      step: 2,
      questionsQuantity: 2,
    })).toEqual({
      type: RESET_GAME,
    });
  });
});

describe(`Reducer works correctly`, () => {
  const initialState = {
    step: -1,
    mistakes: 0,
    currentTime: 0,
  };

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({...initialState});
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer(undefined, {
      type: INCREMENT_STEP,
      payload: 1,
    })).toEqual({
      ...initialState,
      step: 0,
    });

    expect(reducer(undefined, {
      type: INCREMENT_STEP,
      payload: 0,
    })).toEqual({...initialState});
  });

  it(`Reducer should increment number of mistakes by a given value`, () => {
    expect(reducer(undefined, {
      type: INCREMENT_MISTAKES,
      payload: 1,
    })).toEqual({
      ...initialState,
      mistakes: 1,
    });

    expect(reducer(undefined, {
      type: INCREMENT_MISTAKES,
      payload: 0,
    })).toEqual({...initialState});
  });

  it(`Reducer should increment currentTime by a given value`, () => {
    expect(reducer(undefined, {
      type: INCREMENT_TIME,
      payload: 1,
    })).toEqual({
      ...initialState,
      currentTime: 1,
    });
  });

  it(`Reducer should reset application state by a given value`, () => {
    expect(reducer({
      ...initialState,
      mistakes: GAME_SETTINGS.GAME_TIME,
    }, {
      type: RESET_GAME,
    })).toEqual({...initialState});
  });

  it(`Reducer should correctly reset application state`, () => {
    expect(reducer({
      step: 1000000,
      mistakes: 12309,
      currentTime: 500,
    }, {
      type: RESET_GAME,
    })).toEqual({...initialState});
  });
});
