import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import ContainedFigure from './ContainedFigure';

describe('ContainedFigure', () => {
  test('background set by given props.srcValue', () => {
    const tree = renderer.create(<ContainedFigure src='srcValue' />).toJSON()
    expect(tree).toHaveStyleRule('background', 'url(srcValue) center/contain no-repeat');
  });
});