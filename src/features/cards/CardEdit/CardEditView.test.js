import React from 'react';
import { shallow } from 'enzyme';
import View from './CardEditView';

describe('CardEditView', () => {
  test('defaults isFetchNeeded to true', () => {
    const wrapper = shallow(newView({ isFetchNeeded: true }));
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

  test('cancel clicked', () => {
    const onCancel = jest.fn();
    const wrapper = shallow(newView({ onCancel }));
    wrapper.find('Button[data-name="cancel"]').props().onClick();
    expect(onCancel).toHaveBeenCalled();
  });
});

function newView(propOverrides, itemOverrides) {
  const props = Object.assign({
    id: 'id value',
    onCancel: jest.fn(),
    onFetch: jest.fn(),
    onSave: jest.fn(),
    isFetchNeeded: false,
    card: {
      sideAText: 'sideAText value',
      sideBText: 'sideBText value'
    }
  }, propOverrides);
  return <View {...props} />;
}