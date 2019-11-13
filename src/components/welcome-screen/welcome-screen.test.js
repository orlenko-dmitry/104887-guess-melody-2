import React from 'react';
import {render} from '@testing-library/react';

import WelcomeScreen from './welcome-screen.jsx';

it(`WelcomeScreen renders correctly`, () => {
  const {container} = render(
      <WelcomeScreen
        minutes={0}
        mistakesNumber={0}
        onStartGameClick={() => {}}
      />
  );

  expect(container.firstChild).toMatchSnapshot();
});
