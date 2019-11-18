import React from 'react';
import {render} from '@testing-library/react';

import GameMistakes from '../game-mistakes/game-mistakes.jsx';

it(`GameMistakes renders correctly`, () => {
  const {container} = render(<GameMistakes mistakes={0} />);

  expect(container.firstChild).toMatchSnapshot();
});
