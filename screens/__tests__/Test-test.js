// __tests__/Intro-test.js
import React from 'react';
import Test from "../Test";
import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const tree = renderer.create(<Test/>).toJSON();
    expect(tree).toMatchSnapshot();
});