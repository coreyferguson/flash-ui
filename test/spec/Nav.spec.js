
import React from 'react';
import { expect, sinon } from '../support/TestUtilities';
import NavView from '../../src/Nav/Nav';
import { shallow } from 'enzyme';

describe('Nav', () => {

  it('Nav optional params', () => {
    const wrapper = shallow(<NavView />);
    expect(wrapper.find('nav')).to.exist;
  });

});
