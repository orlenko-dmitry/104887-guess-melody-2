import React from 'react';
import {number} from 'prop-types';

import {formatedTime} from '../../helpers/helpers.js';

const GameTimer = ({gameTime, currentTime}) => {

  const leftTime = gameTime - currentTime;
  const minutes = Math.floor(leftTime / 60);
  const seconds = leftTime % 60;

  return (
    <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
      <span className="timer__mins">{formatedTime(minutes)}</span>
      <span className="timer__dots">:</span>
      <span className="timer__secs">{formatedTime(seconds)}</span>
    </div>
  );
};

GameTimer.propTypes = {
  gameTime: number.isRequired,
  currentTime: number.isRequired,
};

export default GameTimer;
