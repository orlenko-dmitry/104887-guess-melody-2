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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: -1,
    };
    this.nextScreenHandler = this.nextScreenHandler.bind(this);
  }

  nextScreenHandler() {
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
    const gameArtisDataIndex = questions.map((question) => question.type).indexOf(`artist`);
    const gameGenreDataIndex = questions.map((question) => question.type).indexOf(`genre`);

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
            <Case condition={questions[currentQuestion] && questions[currentQuestion].type === `artist`}>
              <GameArtist gameData={questions[gameArtisDataIndex]} onNextScreenClick={this.nextScreenHandler} />
            </Case>
            <Case condition={questions[currentQuestion] && questions[currentQuestion].type === `genre`}>
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
