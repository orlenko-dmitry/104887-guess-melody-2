import React from 'react';
import {render} from '@testing-library/react';

import GameTimer from '../game-timer/game-timer.jsx';

it(`GameTimer renders correctly`, () => {
  const {container} = render(<GameTimer gameTime={300} currentTime={0} />);

  expect(container).toMatchSnapshot();
});
