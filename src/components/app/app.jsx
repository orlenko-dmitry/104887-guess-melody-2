/* eslint-disable no-invalid-this */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {arrayOf, shape, number, func} from 'prop-types';
import {
  If,
  Then,
  Else,
  Switch,
  Case,
  Default,
} from 'react-if';

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GameArtist from '../game-artist/game-artist.jsx';
import GameGenre from '../game-genre/game-genre.jsx';
import {QUESTION_TYPE, GAME_SETTINGS} from '../../consts/index.js';
import actions from '../../actions.js';

const {GAME_TIME, MAX_MISTAKES} = GAME_SETTINGS;

class App extends PureComponent {
  static propTypes = {
    questions: arrayOf(shape({})).isRequired,
    step: number.isRequired,
    mistakes: number.isRequired,
    currentTime: number.isRequired,
    incrementStep: func.isRequired,
    incrementMistakes: func.isRequired,
    incrementTime: func.isRequired,
    resetGame: func.isRequired,
  }

  timerId;

  componentDidUpdate() {
    const {
      currentTime,
      resetGame,
    } = this.props;

    if (currentTime === GAME_TIME) {
      clearInterval(this.timerId);
      resetGame();
    }
  }

  nextScreenHandler = () => {
    const {
      questions,
      step,
      incrementStep,
    } = this.props;

    incrementStep({step, questionsQuantity: questions.length});
  }

  getAnswerHandler = ({answer, question}) => {
    const {
      incrementMistakes,
      mistakes,
    } = this.props;

    incrementMistakes({
      userAnswer: answer,
      question,
      mistakes,
      MAX_MISTAKES,
    });
    this.nextScreenHandler();
  }

  incrementTimeHandler = () => {
    const {incrementTime} = this.props;

    this.timerId = setInterval(() => incrementTime(), 1000);
  };

  startGameHandler = () => {
    this.incrementTimeHandler();
    this.nextScreenHandler();
  };

  render() {
    const {
      questions,
      step,
      mistakes,
      currentTime,
    } = this.props;
    const gameArtisDataIndex = questions.map((question) => question.type).indexOf(QUESTION_TYPE.ARTIST);
    const gameGenreDataIndex = questions.map((question) => question.type).indexOf(QUESTION_TYPE.GENRE);
    const caseCondition = step === -1 ? `` : questions[step].type;

    return (
      <If condition={step === -1}>
        <Then>
          <WelcomeScreen
            minutes={GAME_TIME / 60}
            mistakesNumber={MAX_MISTAKES}
            onStartGameClick={this.startGameHandler}
          />
        </Then>
        <Else>
          <Switch>
            <Case condition={caseCondition === QUESTION_TYPE.ARTIST}>
              <GameArtist
                gameData={questions[gameArtisDataIndex]}
                mistakes={mistakes}
                gameTime={GAME_TIME}
                currentTime={currentTime}
                onSetAnswerClick={this.getAnswerHandler}
              />
            </Case>
            <Case condition={caseCondition === QUESTION_TYPE.GENRE}>
              <GameGenre
                gameData={questions[gameGenreDataIndex]}
                mistakes={mistakes}
                gameTime={GAME_TIME}
                currentTime={currentTime}
                onSetAnswerClick={this.getAnswerHandler}
              />
            </Case>
            <Default>
              {null}
            </Default>
          </Switch>
        </Else>
      </If>
    );
  }
}

const mapStateToProps = ({step, mistakes, currentTime}) => ({step, mistakes, currentTime});

const mapDispatchtoProps = (dispatch) => ({
  incrementMistakes: (payload) => dispatch(actions.incrementMistakes(payload)),
  incrementStep: (payload) => dispatch(actions.incrementStep(payload)),
  incrementTime: (payload) => dispatch(actions.incrementTime(payload)),
  resetGame: () => dispatch(actions.resetGame()),
});

export {App};

export default connect(mapStateToProps, mapDispatchtoProps)(App);
