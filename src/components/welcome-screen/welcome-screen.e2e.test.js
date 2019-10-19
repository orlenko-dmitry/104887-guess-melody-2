import React from 'react';
import Emzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WelcomeScreen from './welcome-screen.jsx';

Emzyme.configure({adapter: new Adapter()});

it(`WelcomeScreen renders correctly`, () => {
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
