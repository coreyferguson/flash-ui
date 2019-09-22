
import React from 'react';
import { expect, sinon, shallow } from '../support/TestUtilities';
import NavView from '../../src/Nav/Nav';
import sessionService from '../support/stubs/authentication/sessionServiceStub';
import { Link } from 'react-router-dom';

describe('Nav', () => {

  it('Nav - authenticated view', () => {
    const wrapper = shallow(<NavView sessionService={sessionService} authenticated={false} />);
    expect(wrapper.find(Link).get(1).props.to).to.equal('/signin');
  });

  it('Nav - unauthenticated view', async () => {
    const wrapper = shallow(<NavView sessionService={sessionService} authenticated={true} />);
    expect(wrapper.find(Link).get(1).props.to).to.equal('/signout');
  });

});
