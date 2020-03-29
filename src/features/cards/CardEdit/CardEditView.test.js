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

  describe('onSave', () => {
    test('sideAText changed', () => {
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { getValues: () => ({ text: 'sideAText updated value' }) }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { getValues: () => ({ text: 'sideBText value' }) }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { value: 'label1 label2' }
      }));
      const onSave = jest.fn();
      const view = shallow(newView({ onSave }));
      view.find('form').props().onSubmit();
      expect(onSave.mock.calls[0][0].id).toBe('id value');
      expect(onSave.mock.calls[0][0].sideAText).toBe('sideAText updated value');
      expect(onSave.mock.calls[0][0].sideBText).toBe('sideBText value');
    });

    test('sideBText changed', () => {
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { getValues: () => ({ text: 'sideAText value' }) }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { getValues: () => ({ text: 'sideBText updated value' }) }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { value: 'label1 label2' }
      }));
      const onSave = jest.fn();
      const view = shallow(newView({ onSave }));
      view.find('form').props().onSubmit();
      expect(onSave.mock.calls[0][0].id).toBe('id value');
      expect(onSave.mock.calls[0][0].sideAText).toBe('sideAText value');
      expect(onSave.mock.calls[0][0].sideBText).toBe('sideBText updated value');
    });

    test('labels changed', () => {
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { getValues: () => ({ text: 'sideAText value' }) }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { getValues: () => ({ text: 'sideBText value' }) }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { value: 'label1 label2 label3' }
      }));
      const onSave = jest.fn();
      const view = shallow(newView({ onSave }));
      view.find('form').props().onSubmit();
      expect(onSave.mock.calls[0][0].id).toBe('id value');
      expect(onSave.mock.calls[0][0].sideAText).toBe('sideAText value');
      expect(onSave.mock.calls[0][0].sideBText).toBe('sideBText value');
      expect(onSave.mock.calls[0][0].labels).toEqual(['label1', 'label2', 'label3']);
    });
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
      labels: ['label1', 'label2'],
      sideAText: 'sideAText value',
      sideBText: 'sideBText value',
    }
  }, propOverrides);
  return <View {...props} />;
}