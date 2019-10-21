import React from 'react';
import {shallow} from 'enzyme';

import WelcomeScreen from './welcome-screen.jsx';

it(`startGameHandler have been called 1 time`, () => {
  const startGameHandler = jest.fn();
  const wrapper = shallow(
      <WelcomeScreen
        minutes={0}
        mistakesNumber={0}
        startGameHandler={startGameHandler}
      />
  );

  const startButton = wrapper.find(`button`);
  startButton.simulate(`click`);
  expect(startGameHandler).toHaveBeenCalledTimes(1);
});
