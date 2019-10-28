import React from 'react';
import {mount} from 'enzyme';

import GameGenre from './game-genre.jsx';
import questions from '../../mocks/questions.js';

describe(`Test for GameGenre`, () => {
  it(`onSetAnswerClick have been called 1 time`, () => {
    const onSetAnswerClick = jest.fn();
    const wrapper = mount(
        <GameGenre
          gameData={questions[1]}
          onSetAnswerClick={onSetAnswerClick}
        />
    );
    const submitBtn = wrapper.find(`.game__submit`);
    submitBtn.simulate(`click`, {preventDefault() {}});
    expect(onSetAnswerClick).toHaveBeenCalledTimes(1);
  });
  it(`onSetAnswerClick calls its callback with an array`, () => {
    const onSetAnswerClick = jest.fn();
    const wrapper = mount(
        <GameGenre
          gameData={questions[1]}
          onSetAnswerClick={onSetAnswerClick}
        />
    );
    const submitBtn = wrapper.find(`.game__submit`);
    submitBtn.simulate(`click`, {preventDefault() {}});
    expect(onSetAnswerClick).toBecalledWith(expect.any(Array));
  });
});
