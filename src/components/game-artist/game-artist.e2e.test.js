import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import GameArtist from './game-artist.jsx';
import questions from '../../mocks/questions.js';

const onSetAnswerClick = jest.fn();
const {getByTestId} = render(
    <GameArtist
      gameData={questions[0]}
      onSetAnswerClick={onSetAnswerClick}
    />
);
const artist = getByTestId(`artist-0`);
jest
  .spyOn(window.HTMLMediaElement.prototype, `pause`)
  .mockImplementation(() => {});

fireEvent.click(artist);

describe(`Tests for GameArtist`, () => {
  it(`onSetAnswerClick have been called 1 time`, () => {
    expect(onSetAnswerClick).toHaveBeenCalledTimes(1);
  });
  it(`onSetAnswerClick calls its callback with a string`, () => {
    expect(onSetAnswerClick).toBeCalledWith(expect.any(String));
  });
});
