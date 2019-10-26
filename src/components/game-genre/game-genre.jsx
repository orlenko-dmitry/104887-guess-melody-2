import React from 'react';
import {arrayOf, shape, string} from 'prop-types';

const GameGenre = ({gameData: {answers}}) => (
  <section className="game game--genre">
    <header className="game__header">
      <a className="game__back" href="#">
        <span className="visually-hidden">Сыграть ещё раз</span>
        <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
        <circle
          className="timer__line"
          cx="390"
          cy="390"
          r="370"
          style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}
        />
      </svg>

      <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span className="timer__mins">05</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">00</span>
      </div>

      <div className="game__mistakes">
        <div className="wrong"></div>
        <div className="wrong"></div>
        <div className="wrong"></div>
      </div>
    </header>

    <section className="game__screen">
      <h2 className="game__title">Выберите инди-рок треки</h2>
      <form className="game__tracks">
        {answers.map(({genre, src}, index) => (
          <div className="track" key={`${genre}-${index}`}>
            <button className="track__button track__button--play" type="button"></button>
            <div className="track__status">
              <audio src={src}></audio>
            </div>
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer" value="answer-1" id="answer-1" />
              <label className="game__check" htmlFor="answer-1">Отметить</label>
            </div>
          </div>
        ))}
        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  </section>
);

GameGenre.propTypes = {
  gameData: shape({
    type: string,
    genre: string,
    answers: arrayOf(shape({
      src: string,
      genre: string,
    }))
  }).isRequired,
};

export default GameGenre;
