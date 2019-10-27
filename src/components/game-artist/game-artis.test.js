import React from 'react';
import renderer from 'react-test-renderer';

import GameArtist from './game-artist.jsx';
import questions from '../../mocks/questions.js';

it(`GameArtist renders correctly`, () => {
  const tree = renderer
    .create(
        <GameArtist
          gameData={questions[0]}
          onNextScreenClick={() => {}}
          onSetAnswerClik={() => {}}
        />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
