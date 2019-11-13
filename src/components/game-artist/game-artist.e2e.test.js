import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import GameArtist from './game-artist.jsx';
import questions from '../../mocks/questions.js';

const clickHandler = jest.fn();
const {getByTestId} = render(
    <GameArtist
      gameData={questions[0]}
      mistakes={0}
      gameTime={300}
      currentTime={0}
      onSetAnswerClick={clickHandler}
    />
);
const artist = getByTestId(`artist-0`);
jest
  .spyOn(window.HTMLMediaElement.prototype, `pause`)
  .mockImplementation(() => {});

fireEvent.click(artist);

describe(`Tests for GameArtist`, () => {
  it(`onSetAnswerClick have been called 1 time`, () => {
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
  it(`onSetAnswerClick calls its callback with an object`, () => {
    expect(clickHandler).toBeCalledWith(expect.any(Object));
  });
});
