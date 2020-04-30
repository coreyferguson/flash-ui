import React from 'react';
import { shallow } from 'enzyme';
import View from './CardEditView';
import sessionService from '../../../context/authentication/sessionService';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    goBack: jest.fn()
  })
}));

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

  test('delete clicked and user confirmed', () => {
    jest.spyOn(sessionService, 'getSignInUserSession').mockImplementation(() => ({
      idToken: {
        payload: {
          sub: 'user id value'
        }
      }
    }));
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    const onDelete = jest.fn();
    const wrapper = shallow(newView({ onDelete, id: 'id value' }));
    wrapper.find('Button[data-name="delete"]').props().onClick();
    expect(onDelete).toHaveBeenCalledWith({ id: 'id value', userId: 'user id value' });
  });

  test('delete clicked and user does not confirm', () => {
    jest.spyOn(sessionService, 'getSignInUserSession').mockImplementation(() => ({
      idToken: {
        payload: {
          sub: 'user id value'
        }
      }
    }));
    jest.spyOn(window, 'confirm').mockImplementation(() => false);
    const onDelete = jest.fn();
    const wrapper = shallow(newView({ onDelete, id: 'id value' }));
    wrapper.find('Button[data-name="delete"]').props().onClick();
    expect(onDelete).not.toHaveBeenCalled();
  });

  describe('onSave', () => {
    beforeAll(() => {
      jest.spyOn(sessionService, 'getSignInUserSession').mockImplementation(() => ({
        idToken: {
          payload: {
            sub: 'user id value'
          }
        }
      }));
    });

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
      expect(onSave.mock.calls[0][0].card.id).toBe('id value');
      expect(onSave.mock.calls[0][0].card.sideAText).toBe('sideAText updated value');
      expect(onSave.mock.calls[0][0].card.sideBText).toBe('sideBText value');
      expect(onSave.mock.calls[0][0].card.userId).toBe('user id value');
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
      expect(onSave.mock.calls[0][0].card.id).toBe('id value');
      expect(onSave.mock.calls[0][0].card.sideAText).toBe('sideAText value');
      expect(onSave.mock.calls[0][0].card.sideBText).toBe('sideBText updated value');
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
      expect(onSave.mock.calls[0][0].card.id).toBe('id value');
      expect(onSave.mock.calls[0][0].card.sideAText).toBe('sideAText value');
      expect(onSave.mock.calls[0][0].card.sideBText).toBe('sideBText value');
      expect(onSave.mock.calls[0][0].card.labels).toEqual(['label1', 'label2', 'label3']);
    });
  });

  describe('onCancel', () => {
    test('onCancel callback when cancel button clicked', () => {
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { getValues: () => ({ text: 'sideAText value' }) }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { getValues: () => ({ text: 'sideBText value' }) }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { value: 'label1 label2' }
      }));
      const onCancel = jest.fn();
      const view = shallow(newView({ onCancel }));
      view.find('[data-name="cancel"]').props().onClick();
      expect(onCancel).toHaveBeenCalled();
    });

    test('onCancel callback to confirm with user before erasing data', () => {
      jest.spyOn(window, 'confirm').mockImplementation(() => false);
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { getValues: () => ({ text: 'sideAText value changed' }) }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { getValues: () => ({ text: 'sideBText value' }) }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { value: 'label1 label2' }
      }));
      const onCancel = jest.fn();
      const view = shallow(newView({ onCancel }));
      view.find('[data-name="cancel"]').props().onClick();
      expect(onCancel).not.toHaveBeenCalled();
    });

    test('onCancel callback after user confirms', () => {
      jest.spyOn(window, 'confirm').mockImplementation(() => true);
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { getValues: () => ({ text: 'sideAText value' }) }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { getValues: () => ({ text: 'sideBText value changed' }) }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: { value: 'label1 label2' }
      }));
      const onCancel = jest.fn();
      const view = shallow(newView({ onCancel }));
      view.find('[data-name="cancel"]').props().onClick();
      expect(onCancel).toHaveBeenCalled();
    });
  });

  describe('onCancel dirty checks', () => {
    function onCancel({
      sideATextBefore='a', sideATextAfter='a',
      sideAImageUrlBefore='a', sideAImageUrlAfter='a',
      sideAImageFile,
      sideBTextBefore='a', sideBTextAfter='a',
      sideBImageUrlBefore='a', sideBImageUrlAfter='a',
      sideBImageFile,
      labelsBefore='a', labelsAfter='a',
    }) {
      jest.spyOn(window, 'confirm').mockImplementationOnce(() => false);
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: {
          getValues: () => ({
            text: sideATextAfter,
            imageUrl: sideAImageUrlAfter,
            imageFile: sideAImageFile,
          })
        }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({
        current: {
          getValues: () => ({
            text: sideBTextAfter,
            imageUrl: sideBImageUrlAfter,
            imageFile: sideBImageFile,
          })
        }
      }));
      jest.spyOn(React, 'useRef').mockImplementationOnce(() => ({ current: { value: labelsAfter } }));
      const onCancel = jest.fn();
      const view = shallow(newView({
        onCancel,
        card: {
          sideAText: sideATextBefore,
          sideAImageUrl: sideAImageUrlBefore,
          sideBText: sideBTextBefore,
          sideBImageUrl: sideBImageUrlBefore,
          labels: labelsBefore && labelsBefore.trim().split(' '),
        }
      }));
      view.find('[data-name="cancel"]').props().onClick();
      return onCancel;
    }

    test('onCancel every permutation of dirty', () => {
      // sideAText
      expect(onCancel({ sideATextBefore: null, sideATextAfter: null })).toHaveBeenCalled();
      expect(onCancel({ sideATextBefore: 'a', sideATextAfter: 'a' })).toHaveBeenCalled();
      expect(onCancel({ sideATextBefore: 'a', sideATextAfter: 'b' })).not.toHaveBeenCalled();
      expect(onCancel({ sideATextBefore: '', sideATextAfter: '' })).toHaveBeenCalled();
      expect(onCancel({ sideATextBefore: null, sideATextAfter: '' })).toHaveBeenCalled();
      expect(onCancel({ sideATextBefore: '', sideATextAfter: null })).toHaveBeenCalled();
      // sideBText
      expect(onCancel({ sideBTextBefore: null, sideBTextAfter: null })).toHaveBeenCalled();
      expect(onCancel({ sideBTextBefore: 'a', sideBTextAfter: 'a' })).toHaveBeenCalled();
      expect(onCancel({ sideBTextBefore: 'a', sideBTextAfter: 'b' })).not.toHaveBeenCalled();
      expect(onCancel({ sideBTextBefore: '', sideBTextAfter: '' })).toHaveBeenCalled();
      expect(onCancel({ sideBTextBefore: null, sideBTextAfter: '' })).toHaveBeenCalled();
      expect(onCancel({ sideBTextBefore: '', sideBTextAfter: null })).toHaveBeenCalled();
      // sideAImageUrl
      expect(onCancel({ sideAImageUrlBefore: null, sideAImageUrlAfter: null })).toHaveBeenCalled();
      expect(onCancel({ sideAImageUrlBefore: 'a', sideAImageUrlAfter: 'a' })).toHaveBeenCalled();
      expect(onCancel({ sideAImageUrlBefore: null, sideAImageUrlAfter: 'a' })).not.toHaveBeenCalled();
      expect(onCancel({ sideAImageUrlBefore: 'a', sideAImageUrlAfter: null })).not.toHaveBeenCalled();
      expect(onCancel({ sideAImageUrlBefore: 'a', sideAImageFile: null })).toHaveBeenCalled();
      expect(onCancel({ sideAImageUrlBefore: null, sideAImageFile: 'a' })).not.toHaveBeenCalled();
      expect(onCancel({ sideAImageUrlBefore: 'a', sideAImageFile: 'b' })).not.toHaveBeenCalled();
      // sideBImageUrl
      expect(onCancel({ sideBImageUrlBefore: null, sideBImageUrlAfter: null })).toHaveBeenCalled();
      expect(onCancel({ sideBImageUrlBefore: 'a', sideBImageUrlAfter: 'a' })).toHaveBeenCalled();
      expect(onCancel({ sideBImageUrlBefore: null, sideBImageUrlAfter: 'a' })).not.toHaveBeenCalled();
      expect(onCancel({ sideBImageUrlBefore: 'a', sideBImageUrlAfter: null })).not.toHaveBeenCalled();
      expect(onCancel({ sideBImageUrlBefore: 'a', sideBImageFile: null })).toHaveBeenCalled();
      expect(onCancel({ sideBImageUrlBefore: null, sideBImageFile: 'a' })).not.toHaveBeenCalled();
      expect(onCancel({ sideBImageUrlBefore: 'a', sideBImageFile: 'b' })).not.toHaveBeenCalled();
      // labels
      expect(onCancel({ labelsBefore: null, labelsAfter: null })).toHaveBeenCalled();
      expect(onCancel({ labelsBefore: 'a', labelsAfter: 'a' })).toHaveBeenCalled();
      expect(onCancel({ labelsBefore: 'a', labelsAfter: null })).not.toHaveBeenCalled();
      expect(onCancel({ labelsBefore: null, labelsAfter: 'a' })).not.toHaveBeenCalled();
      expect(onCancel({ labelsBefore: 'a', labelsAfter: 'b' })).not.toHaveBeenCalled();
    });
  });
});

function newView(propOverrides) {
  const props = Object.assign({
    id: 'id value',
    onCancel: jest.fn(),
    onDelete: jest.fn(),
    onFetch: jest.fn(),
    onFetchImage: jest.fn(),
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