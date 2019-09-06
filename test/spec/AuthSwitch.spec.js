
import React from 'react';
import AuthSwitch from '../../src/authentication/AuthSwitch';
import sessionService from '../support/stubs/authentication/sessionServiceStub';
import { expect, shallow, sinon } from '../support/TestUtilities';

describe('AuthSwitch', () => {

  const sandbox = sinon.createSandbox();
  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
  const Authenticated = () => <h1>Authenticated</h1>;
  const Unauthenticated = () => <h1>Unauthenticated</h1>;

  afterEach(() => {
    sandbox.restore();
  });

  it('Unauthenticated view', () => {
    sandbox.stub(sessionService, 'isUserSignedIn').returns(false);
    const wrapper = shallow(
      <AuthSwitch
        sessionService={sessionService}
        authenticated={Authenticated}
        unauthenticated={Unauthenticated} />
    );
    expect(wrapper.html()).to.contain('Unauthenticated');
  });

  it('Authenticated view', () => {
    sandbox.stub(sessionService, 'isUserSignedIn').returns(true);
    const wrapper = shallow(
      <AuthSwitch
        sessionService={sessionService}
        authenticated={Authenticated}
        unauthenticated={Unauthenticated} />
    );
    expect(wrapper.html()).to.contain('Authenticated');

  });

});
