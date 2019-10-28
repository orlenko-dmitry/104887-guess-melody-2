import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';
import questions from '../../mocks/questions.js';
import gameSettings from '../../mocks/gameSettings.js';

it(`App renders correctly`, () => {
  const tree = renderer
    .create(< App questions={questions} gameSettings={gameSettings} />).toJSON();
  expect(tree).toMatchSnapshot();
});
