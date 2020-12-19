import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RandomFact from './randomFact';

Enzyme.configure({ adapter: new Adapter() });

test('Component has a section', () => {
  const wrapper = shallow(
    <RandomFact />,
  );
  expect(wrapper.html()).toContain('<section>');
});

// Abandoned as I had trouble executing tests for the
// asynchnonous components load and ran out of time
