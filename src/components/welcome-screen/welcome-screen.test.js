import React from 'react';
import renderer from 'react-test-renderer';

import WelcomeScreen from './welcome-screen.jsx';

it(`WelcomeScreen renders correctly`, () => {
  const tree = renderer
    .create(
        <WelcomeScreen
          minutes={7}
          mistakesNumber={4}
          onNextScreenClick={() => {}}
        />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
