import React from 'react';
import {number, func} from 'prop-types';

const WelcomeScreen = ({
  minutes,
  mistakesNumber,
  onStartGameClick,
}) => (
  <section className="welcome">
    <div className="welcome__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
    </div>
    <button
      className="welcome__button"
      data-testid="start-game-btn"
      onClick={onStartGameClick}
    >
      <span className="visually-hidden">Начать игру</span>
    </button>
    <h2 className="welcome__rules-title">Правила игры</h2>
    <p className="welcome__text">Правила просты:</p>
    <ul className="welcome__rules-list">
      <li>За {minutes} минут нужно ответить на все вопросы.</li>
      <li>Можно допустить {mistakesNumber} ошибки.</li>
    </ul>
    <p className="welcome__text">Удачи!</p>
  </section>
);

WelcomeScreen.propTypes = {
  minutes: number.isRequired,
  mistakesNumber: number.isRequired,
  onStartGameClick: func.isRequired,
};

export default WelcomeScreen;
