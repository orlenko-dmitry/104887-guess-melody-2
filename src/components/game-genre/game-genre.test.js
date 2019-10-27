import React from 'react';
import renderer from 'react-test-renderer';

import GameGenre from './game-genre.jsx';
import questions from '../../mocks/questions.js';

it(`GameGenre renders correctly`, () => {
  const tree = renderer
    .create(
        <GameGenre
          gameData={questions[1]}
          onSetAnswerClick={() => {}}
        />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
