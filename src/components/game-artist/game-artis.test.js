import React from 'react';
import {render} from '@testing-library/react';

import GameArtist from './game-artist.jsx';
import questions from '../../mocks/questions.js';

it(`GameArtist renders correctly`, () => {
  const {container} = render(
      <GameArtist
        gameData={questions[0]}
        mistakes={0}
        gameTime={300}
        currentTime={0}
        onSetAnswerClick={() => {}}
      />,
  );

  expect(container.firstChild).toMatchSnapshot();
});
