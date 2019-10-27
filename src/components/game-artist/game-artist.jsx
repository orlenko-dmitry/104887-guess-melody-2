import React from 'react';
import {
  arrayOf,
  shape,
  string,
  func,
} from 'prop-types';

const GameArtist = ({
  gameData: {
    song: {src},
    answers,
  },
  onSetAnswerClick,
}) => (
  <section className="game game--artist">
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
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          <button className="track__button track__button--play" type="button"></button>
          <div className="track__status">
            <audio src={src}></audio>
          </div>
        </div>
      </div>

      <form className="game__artist">
        {answers.map(({picture, artist}, index) => (
          <div
            className="artist" key={`${artist}-${index}`}
            onClick={() => onSetAnswerClick(artist)}
          >
            <input
              className="artist__input visually-hidden"
              type="radio" name="answer"
              value={`artist-${index}`}
              id={`answer-${index}`}
            />
            <label className="artist__name" htmlFor={`answer-${index}`}>
              <img className="artist__picture" src={picture} alt="Пелагея" />
              {artist}
            </label>
          </div>
        ))}
      </form>
    </section>
  </section>
);

GameArtist.propTypes = {
  gameData: shape({
    type: string,
    song: shape({
      artist: string,
      src: string,
    }),
    answers: arrayOf(shape({
      picture: string,
      src: string,
    }))
  }).isRequired,
  onSetAnswerClick: func.isRequired,
};

export default GameArtist;
