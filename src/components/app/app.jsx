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
import {QUESTION_TYPE} from '../../consts/index.js';
import actions from '../../actions.js';

class App extends PureComponent {
  static propTypes = {
    questions: arrayOf(shape({})).isRequired,
    gameSettings: shape({
      gameTime: number.isRequired,
      maxMistakes: number.isRequired,
    }).isRequired,
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
      gameSettings: {gameTime},
      resetGame,
    } = this.props;

    if (currentTime >= gameTime) {
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
      gameSettings: {maxMistakes},
      incrementMistakes,
      mistakes,
    } = this.props;

    incrementMistakes({
      userAnswer: answer,
      question,
      mistakes,
      maxMistakes,
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
      gameSettings: {gameTime, maxMistakes},
      questions,
      step,
      mistakes,
    } = this.props;
    const gameArtisDataIndex = questions.map((question) => question.type).indexOf(QUESTION_TYPE.ARTIST);
    const gameGenreDataIndex = questions.map((question) => question.type).indexOf(QUESTION_TYPE.GENRE);
    const caseCondition = step === -1 ? `` : questions[step].type;

    return (
      <If condition={step === -1}>
        <Then>
          <WelcomeScreen
            minutes={gameTime / 60}
            mistakesNumber={maxMistakes}
            onStartGameClick={this.startGameHandler}
          />
        </Then>
        <Else>
          <Switch>
            <Case condition={caseCondition === QUESTION_TYPE.ARTIST}>
              <GameArtist
                gameData={questions[gameArtisDataIndex]}
                mistakes={mistakes}
                onSetAnswerClick={this.getAnswerHandler}
              />
            </Case>
            <Case condition={caseCondition === QUESTION_TYPE.GENRE}>
              <GameGenre
                gameData={questions[gameGenreDataIndex]}
                mistakes={mistakes}
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
