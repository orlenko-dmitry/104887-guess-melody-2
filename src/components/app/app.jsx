/* eslint-disable no-invalid-this */
import React, {Component} from 'react';
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

class App extends Component {
  static propTypes = {
    questions: arrayOf(shape({})).isRequired,
    gameSettings: shape({
      gameTime: number.isRequired,
      maxMistakes: number.isRequired,
    }).isRequired,
    step: number.isRequired,
    mistakes: number.isRequired,
    incrementStep: func.isRequired,
    incrementMistakes: func.isRequired,
  }

  nextScreenHandler = () => {
    const {
      questions,
      step,
      incrementStep,
    } = this.props;

    incrementStep({step, questionsQuantity: questions.length});
  }

  getAnswerHandler = (answer) => {
    this.nextScreenHandler();
    return answer;
  }

  render() {
    const {
      gameSettings: {gameTime, maxMistakes},
      questions,
      step,
    } = this.props;
    const gameArtisDataIndex = questions.map((question) => question.type).indexOf(QUESTION_TYPE.ARTIST);
    const gameGenreDataIndex = questions.map((question) => question.type).indexOf(QUESTION_TYPE.GENRE);
    const caseCondition = step === -1 ? `` : questions[step].type;

    return (
      <If condition={step === -1}>
        <Then>
          <WelcomeScreen
            minutes={gameTime}
            mistakesNumber={maxMistakes}
            onNextScreenClick={this.nextScreenHandler}
          />
        </Then>
        <Else>
          <Switch>
            <Case condition={caseCondition === QUESTION_TYPE.ARTIST}>
              <GameArtist
                gameData={questions[gameArtisDataIndex]}
                onSetAnswerClick={this.getAnswerHandler}
              />
            </Case>
            <Case condition={caseCondition === QUESTION_TYPE.GENRE}>
              <GameGenre
                gameData={questions[gameGenreDataIndex]}
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

const mapStateToProps = ({step, mistakes}) => ({step, mistakes});

const mapDispatchtoProps = (dispatch) => ({
  incrementMistakes: () => dispatch(actions.incrementMistakes()),
  incrementStep: (payload) => dispatch(actions.incrementStep(payload)),

});

export {App};

export default connect(mapStateToProps, mapDispatchtoProps)(App);
