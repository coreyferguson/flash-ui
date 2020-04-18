
import React from 'react';
import { shallow } from 'enzyme';
import View from './CardEditSide';

describe('CardEditSide', () => {

  test('onFetchImage not called when there is no imageUrl provided', () => {
    const onFetchImage = jest.fn();
    shallow(newView({ isImageLoading: false, onFetchImage }));
    expect(onFetchImage).not.toHaveBeenCalled();
  });

  test('onFetchImage not called when imageUrl but still loading', () => {
    const onFetchImage = jest.fn();
    shallow(newView({ isImageLoading: true, onFetchImage, imageUrl: 'image url' }));
    expect(onFetchImage).not.toHaveBeenCalled();
  });

  test('onFetchImage not called when imageSource already defined', () => {
    const onFetchImage = jest.fn();
    shallow(newView({ isImageLoading: false, onFetchImage, imageUrl: 'image url', imageSource: 'image source' }));
    expect(onFetchImage).not.toHaveBeenCalled();
  });

  test('onFetchImage called when imageUrl provided but no imageSource and not loading', () => {
    const onFetchImage = jest.fn();
    shallow(newView({ isImageLoading: false, onFetchImage, imageUrl: 'image url' }));
    expect(onFetchImage).toHaveBeenCalled();
  });

});

function newView(propOverrides) {
  const props = {
    sideName: 'A',
    ...propOverrides
  };
  return <View {...props} />;
}