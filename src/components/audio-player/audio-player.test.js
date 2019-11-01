import React from 'react';
import {render} from '@testing-library/react';

import AudioPlayer from './audio-player.jsx';
import questions from '../../mocks/questions.js';

const {song: {src}} = questions[0];

it(`AudioPlayer renders correctly`, () => {
  const {container} = render(
      <AudioPlayer
        src={src}
        isPlaying={false}
        onPlayButtonClick={() => {}}
      />
  );

  expect(container).toMatchSnapshot();
});
