import React from 'react';
import { shallow } from 'enzyme';
import View from './CardView';

describe('CardView', () => {
  test.todo('CardView');
  // test('renders side A by default', () => {
  //   const wrapper = shallow(newView());
  //   const CardSideView = wrapper.find('CardSideView');
  //   expect(CardSideView.prop('text')).toBe('sideATextValue');
  //   expect(CardSideView.prop('imageUrl')).toBe('sideAImageUrlValue');
  //   expect(CardSideView.prop('fontSize')).toBe('sideAFontSizeValue');
  // });

  // test('renders side B when activeSide is set to B', () => {
  //   const wrapper = shallow(newView(undefined, { activeSide: 'B' }));
  //   const CardSideView = wrapper.find('CardSideView');
  //   expect(CardSideView.prop('text')).toBe('sideBTextValue');
  //   expect(CardSideView.prop('imageUrl')).toBe('sideBImageUrlValue');
  //   expect(CardSideView.prop('fontSize')).toBe('sideBFontSizeValue');
  // });

  // test('flip the card over', () => {
  //   const onFlipCard = jest.fn();
  //   const wrapper = shallow(newView({ onFlipCard }));
  //   wrapper.simulate('click');
  //   expect(onFlipCard).toHaveBeenCalled();
  // });
});

function newView(propOverrides, itemOverrides) {
  const props = Object.assign({
    onFlipCard: jest.fn(),
    item: Object.assign({
      id: 'idValue',
      activeSide: 'A',
      sideAText: 'sideATextValue',
      sideAImageUrl: 'sideAImageUrlValue',
      sideAFontSize: 'sideAFontSizeValue',
      sideBText: 'sideBTextValue',
      sideBImageUrl: 'sideBImageUrlValue',
      sideBFontSize: 'sideBFontSizeValue',
      labels: 'labelsValue',
      lastTestTime: 'lastTestTimeValue'
    }, itemOverrides)
  }, propOverrides);
  return <View {...props} />;
}