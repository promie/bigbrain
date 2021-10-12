import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import QuestionItemDownload from './QuestionItemDownload';

const mockQuestion = {
  id: 1,
  countdown: 20,
  points: 12,
  image: 'https://commons.wikimedia.org/wiki/File:Cat_August_2010-4.jpg',
  youtube: 'https://youtu.be/W1ilCy6XrmI',
  text: 'What was the last Aphex Twin album released before his decade-long hiatus?',
  answers: [
    {
      id: 1,
      text: 'Windowlicker',
      isCorrect: false,
    },
    {
      id: 2,
      text: 'Syro',
      isCorrect: false,
    },
    {
      id: 3,
      text: 'Drukqs',
      isCorrect: true,
    },
    {
      id: 4,
      text: 'Collected Ambient Works 85-92',
      isCorrect: false,
    },
  ],
};

Enzyme.configure({ adapter: new Adapter() });

test('Component displays params exactly as passed in (answers for different test)', () => {
  const wrapper = shallow(
    <QuestionItemDownload
      countdown={mockQuestion.countdown}
      points={mockQuestion.points}
      image={mockQuestion.image}
      youtube={mockQuestion.youtube}
      text={mockQuestion.text}
      answers={mockQuestion.answers}
    />,
  );

  expect(wrapper.html()).toContain(mockQuestion.text);
  expect(wrapper.html()).toContain(`Countdown time (s) = ${mockQuestion.countdown}`);
  expect(wrapper.html()).toContain(`Points = ${mockQuestion.points}`);
  expect(wrapper.html()).toContain(`img src="${mockQuestion.image}"`);
});

test('Component returns empty if text is empty', () => {
  const wrapper = shallow(
    <QuestionItemDownload
      countdown={mockQuestion.countdown}
      points={mockQuestion.points}
      image={mockQuestion.image}
      youtube={mockQuestion.youtube}
      text={null}
      answers={mockQuestion.answers}
    />,
  );
  expect(wrapper.html()).not.toBeTruthy();
});

test('Component has three Grids)', () => {
  const wrapper = shallow(
    <QuestionItemDownload
      countdown={mockQuestion.countdown}
      points={mockQuestion.points}
      image={mockQuestion.image}
      youtube={mockQuestion.youtube}
      text={mockQuestion.text}
      answers={mockQuestion.answers}
    />,
  );
  expect(wrapper.find(Grid)).toHaveLength(3);
});

test('Grid Clicked, List with four components appears', () => {
  const wrapper = shallow(
    <QuestionItemDownload
      countdown={mockQuestion.countdown}
      points={mockQuestion.points}
      image={mockQuestion.image}
      youtube={mockQuestion.youtube}
      text={mockQuestion.text}
      answers={mockQuestion.answers}
    />,
  );
  wrapper.find(Grid).at(1).simulate('click');
  expect(wrapper.find(ListItem)).toHaveLength(4);
});

test('Grid Clicked, First List Item has first answer text', () => {
  const wrapper = shallow(
    <QuestionItemDownload
      countdown={mockQuestion.countdown}
      points={mockQuestion.points}
      image={mockQuestion.image}
      youtube={mockQuestion.youtube}
      text={mockQuestion.text}
      answers={mockQuestion.answers}
    />,
  );
  wrapper.find(Grid).at(1).simulate('click');

  expect(wrapper.find(List).first().html()).toContain(mockQuestion.answers[0].text);
});
