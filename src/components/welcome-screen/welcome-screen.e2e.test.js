import React from 'react';
import {shallow} from 'enzyme';

import WelcomeScreen from './welcome-screen.jsx';

it(`startGameHandler have been called 1 time`, () => {
  const onNextScreenClick = jest.fn();
  const wrapper = shallow(
      <WelcomeScreen
        minutes={0}
        mistakesNumber={0}
        onNextScreenClick={onNextScreenClick}
      />
  );

  const startButton = wrapper.find(`button`);
  startButton.simulate(`click`);
  expect(onNextScreenClick).toHaveBeenCalledTimes(1);
});
