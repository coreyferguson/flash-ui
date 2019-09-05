
import React from 'react';
import { expect, sinon, shallow } from '../support/TestUtilities';
import NavView from '../../src/Nav/Nav';
import sessionService from '../support/stubs/authentication/sessionServiceStub';

describe('Nav', () => {

  it('Nav - authenticated view', () => {
    const wrapper = shallow(<NavView sessionService={sessionService} authenticated={false} />);
    expect(wrapper.html()).to.contain('Signin');
  });

  it('Nav - unauthenticated view', async () => {
    const wrapper = shallow(<NavView sessionService={sessionService} authenticated={true} />);
    expect(wrapper.html()).to.contain('Signout');
  });

});
