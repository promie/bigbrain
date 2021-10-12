import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import QuizListItem from './QuizListItem';

Enzyme.configure({ adapter: new Adapter() });

// TODO rewrite tests as components and structures changed

const mockQuiz = {
  id: 1,
  name: 'myQuiz1',
  active: true,
  thumbnail: 'https://commons.wikimedia.org/wiki/File:Cat_August_2010-4.jpg',
  createdAt: '2020-10-31T14:45:21.077Z',
  owner: 'Bob@bob.com',
};

test('QuizListItem returns empty if name is empty', () => {
  const wrapper = shallow(
    <Router>
      <QuizListItem
        id={mockQuiz.countdown}
        name={null}
        active={mockQuiz.active}
        thumbnail={mockQuiz.thumbnail}
        createdAt={mockQuiz.createdAt}
        owner={mockQuiz.owner}
      />
    </Router>,
  );
  expect(wrapper.html()).not.toBeTruthy();
});

test('QuizListItem returns empty if name is empty', () => {
  const wrapper = shallow(
    <Router>
      <QuizListItem
        id={null}
        name={mockQuiz.name}
        active={mockQuiz.active}
        thumbnail={mockQuiz.thumbnail}
        createdAt={mockQuiz.createdAt}
        owner={mockQuiz.owner}
      />
    </Router>,
  );
  expect(wrapper.html()).not.toBeTruthy();
});

test('QuizListItem returns card components', () => {
  const wrapper = shallow(
    <Router>
      <QuizListItem
        id={mockQuiz.id}
        name={mockQuiz.name}
        active={mockQuiz.active}
        thumbnail={mockQuiz.thumbnail}
        createdAt={mockQuiz.createdAt}
        owner={mockQuiz.owner}
      />
    </Router>,
  );
  expect(wrapper.find(CardHeader)).toBeTruthy();
  expect(wrapper.find(CardMedia)).toBeTruthy();
  expect(wrapper.find(CardContent)).toBeTruthy();
});
