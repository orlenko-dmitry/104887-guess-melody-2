import React from 'react';
import {render, fireEvent, wait} from '@testing-library/react';

import AudioPlayer from './audio-player.jsx';
import questions from '../../mocks/questions.js';

const {song: {src}} = questions[0];

it(`get pause and stop on play button`, () => {
  const clickHandler = jest.fn();
  const {getByTestId} = render(
      <AudioPlayer
        src={src}
        isPlaying={false}
        onPlayButtonClick={clickHandler}
      />
  );
  const playBtn = getByTestId(`play-btn-0`);

  expect(playBtn.classList.contains(`track__button--play`)).toBeTruthy();

  fireEvent.click(playBtn);
  wait(() => expect(playBtn.classList.contains(`track__button--pause`)).toBeTruthy());

  fireEvent.click(playBtn);
  wait(() => expect(playBtn.classList.contains(`track__button--play`)).toBeTruthy());
});
