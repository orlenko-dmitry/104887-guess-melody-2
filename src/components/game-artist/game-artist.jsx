/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
import {
  arrayOf,
  shape,
  oneOf,
  string,
  func,
  number,
} from 'prop-types';

import AudioPlayer from '../audio-player/audio-player.jsx';
import GameMistakes from '../game-mistakes/game-mistakes.jsx';
import GameTimer from '../game-timer/game-timer.jsx';

class GameArtist extends Component {
  static propTypes = {
    gameData: shape({
      type: oneOf([`artist`, `genre`]),
      song: shape({
        artist: string.isRequired,
        src: string.isRequired,
      }),
      answers: arrayOf(shape({
        id: number.isRequired,
        picture: string.isRequired,
        artist: string.isRequired,
      }))
    }).isRequired,
    mistakes: number.isRequired,
    onSetAnswerClick: func.isRequired,
  }

  state = {
    isPlaying: false,
  }

  playButtonClickHandler = () => {
    this.setState({isPlaying: !this.state.isPlaying});
  }

  render() {
    const {
      gameData: {
        song: {src},
        answers,
      },
      gameData,
      mistakes,
      onSetAnswerClick,
    } = this.props;
    const {isPlaying} = this.state;

    return (
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

          <GameTimer />

          <GameMistakes mistakes={mistakes} />
        </header>

        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track">
              <AudioPlayer
                src={src}
                isPlaying={isPlaying}
                onPlayButtonClick={this.playButtonClickHandler}
              />
            </div>
          </div>

          <form className="game__artist">
            {answers.map(({picture, artist, id}, index) => (
              <div
                className="artist"
                key={id}
                data-testid={`artist-${index}`}
                onClick={() => onSetAnswerClick({answer: artist, question: {...gameData}})}
              >
                <input
                  className="artist__input visually-hidden"
                  type="radio" name="answer"
                  value={artist}
                  id={id}
                />
                <label className="artist__name" htmlFor={id}>
                  <img className="artist__picture" src={picture} alt="Пелагея" />
                  {artist}
                </label>
              </div>
            ))}
          </form>
        </section>
      </section>
    );
  }
}

export default GameArtist;
