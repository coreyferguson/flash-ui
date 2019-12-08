import React from 'react';
import { shallow } from 'enzyme';
import View from './CardSideView';
import ContainedFigure from '../ContainedFigure';

describe('CardSideView', () => {
  test.todo('CardSideView');
  // afterEach(() => {
  //   jest.resetAllMocks();
  // });

  // test('render text only', () => {
  //   jest.spyOn(React, 'useState')
  //     .mockImplementationOnce(() => [ undefined, jest.fn() ])
  //     .mockImplementationOnce(() => [ 'markdownValue', jest.fn() ]);
  //   jest.spyOn(React, 'useMemo').mockImplementation(() => {});
  //   const wrapper = shallow(newView());
  //   expect(wrapper.find('span').prop('dangerouslySetInnerHTML').__html).toBe('markdownValue');
  //   expect(wrapper.find(ContainedFigure)).toHaveLength(0);
  // });

  // test('render text and image', () => {
  //   jest.spyOn(React, 'useState')
  //     .mockImplementationOnce(() => [ 'imageSrcValue', jest.fn() ])
  //     .mockImplementationOnce(() => [ 'markdownValue', jest.fn() ]);
  //   jest.spyOn(React, 'useMemo').mockImplementation(() => {});
  //   const wrapper = shallow(newView());
  //   expect(wrapper.find('span').prop('dangerouslySetInnerHTML').__html).toBe('markdownValue');
  //   expect(wrapper.find(ContainedFigure).prop('src')).toBe('imageSrcValue');
  // });
});

function newView(overrideProps) {
  const props = Object.assign({
    fontSize: '14px',
    imageUrl: 'imageUrlValue',
    text: 'textValue'
  }, overrideProps);
  return <View {...props} />;
}