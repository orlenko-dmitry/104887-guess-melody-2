import React from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

const minutes = 7;
const mistakesNumber = 4;

const App = () => (
  <WelcomeScreen
    minutes={minutes}
    mistakesNumber={mistakesNumber}
  />
);

export default App;
