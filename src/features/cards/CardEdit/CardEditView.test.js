import React from 'react';
import { shallow } from 'enzyme';
import View from './CardEditView';

describe('CardEditView', () => {
  test('defaults isFetchNeeded to true', () => {
    const wrapper = shallow(newView());
    expect(wrapper.text()).toBe('loading');
  });

  test('renders card side text when isFetchNeeded is false', () => {
    const wrapper = shallow(newView({
      isFetchNeeded: false,
      card: {
        sideAText: 'sideAText value',
        sideBText: 'sideBText value',
      }
    }));
    const SideA = wrapper.find('CardEditSide[sideName="A"]');
    const SideB = wrapper.find('CardEditSide[sideName="B"]');
    expect(SideA.props().text).toBe('sideAText value');
    expect(SideB.props().text).toBe('sideBText value');
  });
});

function newView(propOverrides, itemOverrides) {
  const props = Object.assign({
    id: 'id value',
    onFetch: jest.fn(),
    onSave: jest.fn()
  }, propOverrides);
  return <View {...props} />;
}