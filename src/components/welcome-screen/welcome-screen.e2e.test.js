import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import WelcomeScreen from './welcome-screen.jsx';

it(`startGameHandler have been called 1 time`, () => {
  const onNextScreenClick = jest.fn();
  const {getByTestId} = render(
      <WelcomeScreen
        minutes={0}
        mistakesNumber={0}
        onNextScreenClick={onNextScreenClick}
      />
  );
  const startButton = getByTestId(`start-game-btn`);

  fireEvent.click(startButton);

  expect(onNextScreenClick).toHaveBeenCalledTimes(1);
});
