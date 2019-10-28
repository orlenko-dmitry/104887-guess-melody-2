import React from 'react';
import {render} from 'react-dom';

import App from './components/app/app.jsx';
import questions from './mocks/questions.js';
import gameSettings from './mocks/gameSettings.js';

const init = () => {
  render(
      <App questions={questions} gameSettings={gameSettings} />,
      document.getElementById(`root`)
  );
};

init();
