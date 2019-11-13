import React from 'react';
import {render} from '@testing-library/react';

import GameGenre from './game-genre.jsx';
import questions from '../../mocks/questions.js';

it(`GameGenre renders correctly`, () => {
  const {container} = render(
      <GameGenre
        gameData={questions[1]}
        mistakes={0}
        gameTime={300}
        currentTime={0}
        onSetAnswerClick={() => {}}
      />
  );

  expect(container.firstChild).toMatchSnapshot();
});
