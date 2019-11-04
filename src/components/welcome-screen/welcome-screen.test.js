import React from 'react';
import {render} from '@testing-library/react';

import WelcomeScreen from './welcome-screen.jsx';

it(`WelcomeScreen renders correctly`, () => {
  const {container} = render(
      <WelcomeScreen
        minutes={7}
        mistakesNumber={4}
        onNextScreenClick={() => {}}
      />
  );

  expect(container.firstChild).toMatchSnapshot();
});
