import React from 'react';
import {render} from '@testing-library/react';

import {App} from './app.jsx';
import questions from '../../mocks/questions.js';
import gameSettings from '../../mocks/gameSettings.js';

it(`App renders correctly`, () => {
  const {container} = render(
      <App
        questions={questions}
        gameSettings={gameSettings}
        step={-1}
        mistakes={0}
        currentTime={0}
        incrementMistakes={() => {}}
        incrementStep={() => {}}
        incrementTime={() => {}}
        resetGame={() => {}}
      />
  );

  expect(container.firstChild).toMatchSnapshot();
});
