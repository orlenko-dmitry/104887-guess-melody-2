import React from 'react';
import {shallow} from 'enzyme';

import WelcomeScreen from './welcome-screen.jsx';

it(`startGameHundler have been called 1 time`, () => {
  const startGameHundler = jest.fn();
  const wrapper = shallow(
      <WelcomeScreen
        minutes={0}
        mistakesNumber={0}
        startGameHundler={startGameHundler}
      />
  );

  const startButton = wrapper.find(`button`);
  startButton.simulate(`click`);
  expect(startGameHundler).toHaveBeenCalledTimes(1);
});
