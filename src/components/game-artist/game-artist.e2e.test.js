import React from 'react';
import {shallow} from 'enzyme';

import GameArtist from './game-artist.jsx';
import questions from '../../mocks/questions.js';

const onSetAnswerClick = jest.fn();
const wrapper = shallow(
    <GameArtist
      gameData={questions[0]}
      onSetAnswerClick={onSetAnswerClick}
    />
);
const artist = wrapper.find(`.artist`).first();

artist.simulate(`click`);

describe(`Tests for GameArtist`, () => {
  it(`onSetAnswerClick have been called 1 time`, () => {
    expect(onSetAnswerClick).toHaveBeenCalledTimes(1);
  });
  it(`onSetAnswerClick calls its callback with a string`, () => {
    expect(onSetAnswerClick).toBeCalledWith(expect.any(String));
  });
});
