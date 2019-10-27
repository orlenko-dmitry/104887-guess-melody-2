import React, {Component} from 'react';
import {arrayOf, shape, number} from 'prop-types';
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

class App extends Component {
  state = {
    currentQuestion: -1,
  }

  nextScreenHandler = () => {
    const {questions} = this.props;
    const {currentQuestion} = this.state;

    if (currentQuestion === questions.length - 1) {
      this.setState({currentQuestion: -1});
    } else {
      this.setState((prevState) => ({currentQuestion: prevState.currentQuestion + 1}));
    }
  }

  render() {
    const {gameSettings: {gameTime, maxMistakes}, questions} = this.props;
    const {currentQuestion} = this.state;
    const gameArtisDataIndex = questions.map((question) => question.type).indexOf(QUESTION_TYPE.ARTIST);
    const gameGenreDataIndex = questions.map((question) => question.type).indexOf(QUESTION_TYPE.GENRE);
    const caseCondition = currentQuestion === -1 ? `` : questions[currentQuestion].type;

    return (
      <If condition={currentQuestion === -1}>
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
              <GameArtist gameData={questions[gameArtisDataIndex]} onNextScreenClick={this.nextScreenHandler} />
            </Case>
            <Case condition={caseCondition === QUESTION_TYPE.GENRE}>
              <GameGenre gameData={questions[gameGenreDataIndex]} onNextScreenClick={this.nextScreenHandler} />
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

App.propTypes = {
  questions: arrayOf(shape({})).isRequired,
  gameSettings: shape({
    gameTime: number,
    maxMistakes: number,
  }).isRequired,
};

export default App;
