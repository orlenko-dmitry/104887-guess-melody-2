import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import WelcomeScreen from './welcome-screen.jsx';

it(`onStartGameClick have been called 1 time`, () => {
  const clickHandler = jest.fn();
  const {getByTestId} = render(
      <WelcomeScreen
        minutes={0}
        mistakesNumber={0}
        onStartGameClick={clickHandler}
      />
  );
  const startButton = getByTestId(`start-game-btn`);

  fireEvent.click(startButton);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
