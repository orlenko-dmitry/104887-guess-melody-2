import React from 'react';
import {number} from 'prop-types';

const GameMistakes = ({mistakes}) => {
  const mistakesArr = [];
  for (let i = 0; i < mistakes; i++) {
    mistakesArr[i] = i;
  }

  return (
    <div className="game__mistakes">
      {mistakesArr.map((mistake) => <div className="wrong" key={mistake}/>)}
    </div>
  );
};

GameMistakes.propTypes = {
  mistakes: number.isRequired,
};

export default GameMistakes;
