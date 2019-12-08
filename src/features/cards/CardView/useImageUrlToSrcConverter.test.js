import React from 'react';
import useImageUrlToSrcConverter from './useImageUrlToSrcConverter';
import mediaService from '../../media/mediaService';

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('useImageUrlToSrcConverter', () => {
  test('no imageUrl given', async () => {
    const setImageSrc = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => [ undefined, setImageSrc ]);
    jest.spyOn(React, 'useMemo').mockImplementation(fn => fn());
    jest.spyOn(mediaService, 'getUrl').mockImplementation(() => Promise.resolve('imageSrcValue'));
    useImageUrlToSrcConverter(undefined);
    await timeout(1);
    expect(setImageSrc).toBeCalledWith(undefined);
  });

  test('imageUrl converted to imageSrc', async () => {
    const setImageSrc = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => [ undefined, setImageSrc ]);
    jest.spyOn(React, 'useMemo').mockImplementation(fn => fn());
    jest.spyOn(mediaService, 'getUrl').mockImplementation(() => Promise.resolve('imageSrcValue'));
    useImageUrlToSrcConverter('imageUrlValue');
    await timeout(1);
    expect(setImageSrc).toBeCalledWith('imageSrcValue');
  });

  test('returns imageSrc returned local state', () => {
    const setImageSrc = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => [ 'imageSrcValue', setImageSrc ]);
    jest.spyOn(React, 'useMemo').mockImplementation(() => {});
    const imageSrc = useImageUrlToSrcConverter('imageUrlValue');
    expect(imageSrc).toBe('imageSrcValue');
  });
});