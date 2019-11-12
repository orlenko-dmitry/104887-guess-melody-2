import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import questions from './mocks/questions.js';
import gameSettings from './mocks/gameSettings.js';
import reducer from './reducer.js';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const init = () => {
  render(
      <Provider store={store}>
        <App questions={questions} gameSettings={gameSettings} />
      </Provider>,
      document.getElementById(`root`)
  );
};

init();
