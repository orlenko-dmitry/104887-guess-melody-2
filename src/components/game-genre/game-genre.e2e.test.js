import React from 'react';
import {render, fireEvent, wait} from "@testing-library/react";

import GameGenre from './game-genre.jsx';
import questions from '../../mocks/questions.js';

describe(`Test for GameGenre`, () => {
  it(`onSetAnswerClick have been called 1 time`, () => {
    const clickHandler = jest.fn();
    const {getByTestId} = render(
        <GameGenre
          gameData={questions[1]}
          onSetAnswerClick={clickHandler}
        />
    );
    const submitBtn = getByTestId(`submit-btn`);

    fireEvent.click(submitBtn);

    wait(() => expect(clickHandler).toHaveBeenCalledTimes(1));
  });
  it(`onSetAnswerClick calls its callback with an array`, () => {
    const clickHandler = jest.fn();
    const {getByTestId} = render(
        <GameGenre
          gameData={questions[1]}
          onSetAnswerClick={clickHandler}
        />
    );
    const submitBtn = getByTestId(`submit-btn`);

    fireEvent.click(submitBtn);

    wait(() => expect(clickHandler).toBeCalledWith(expect.any(Array)));
  });
});
