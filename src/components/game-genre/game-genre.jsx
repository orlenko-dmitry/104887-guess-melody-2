/* eslint-disable no-invalid-this */
import React, {PureComponent} from 'react';
import {
  arrayOf,
  shape,
  oneOf,
  string,
  func,
  number,
} from 'prop-types';
import {Formik, Form} from 'formik';

import AudioPlayer from '../audio-player/audio-player.jsx';
import GameMistakes from '../game-mistakes/game-mistakes.jsx';
import GameTimer from '../game-timer/game-timer.jsx';

class GameGenre extends PureComponent {
  static propTypes = {
    gameData: shape({
      type: oneOf([`artist`, `genre`]),
      genre: string.isRequired,
      answers: arrayOf(shape({
        id: number.isRequired,
        src: string.isRequired,
        genre: string.isRequired,
      }))
    }).isRequired,
    mistakes: number.isRequired,
    gameTime: number.isRequired,
    currentTime: number.isRequired,
    onSetAnswerClick: func.isRequired,
  }

  state = {
    activePlayer: -1,
  }

  playButtonClickHandler = (index) => () => {
    const {activePlayer} = this.setState;
    this.setState({
      activePlayer: activePlayer === index ? -1 : index
    });
  }

  render() {
    const {
      gameData,
      gameData: {answers},
      mistakes,
      gameTime,
      currentTime,
      onSetAnswerClick,
    } = this.props;
    const {activePlayer} = this.state;


    return (
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

          <GameTimer gameTime={gameTime} currentTime={currentTime} />

          <GameMistakes mistakes={mistakes} />
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите инди-рок треки</h2>
          <Formik
            initialValues={{answer: []}}
            onSubmit={({answer}) => onSetAnswerClick({answer, question: {...gameData}})}
          >
            {({handleChange}) => (
              <Form className="game__tracks">
                {answers.map(({genre, src, id}, index) => (
                  <div className="track" key={id}>
                    <AudioPlayer
                      src={src}
                      isPlaying={index === activePlayer}
                      testidIndex={index}
                      onPlayButtonClick={this.playButtonClickHandler(index)}
                    />
                    <div className="game__answer">
                      <input
                        className="game__input visually-hidden"
                        type="checkbox"
                        name="answer"
                        value={genre}
                        id={id}
                        onChange={handleChange}
                      />
                      <label className="game__check" htmlFor={id}>Отметить</label>
                    </div>
                  </div>
                ))}
                <button
                  className="game__submit button"
                  data-testid="submit-btn"
                  type="submit"
                >
                    Ответить
                </button>
              </Form>
            )}
          </Formik>
        </section>
      </section>
    );
  }
}

export default GameGenre;
