
import React from 'react';
import SigninView from '../../src/authentication/SigninView';
import { expect, sinon, shallow, sandbox } from '../support/TestUtilities';
import clientService from '../support/stubs/clientServiceStub';
import sessionService from '../support/stubs/authentication/sessionServiceStub';

describe('SigninView', () => {

  const sandbox = sinon.createSandbox();
  const view = () => shallow(
    <SigninView
      clientService={clientService}
      sessionService={sessionService} />
  );
  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

  afterEach(() => {
    sandbox.restore();
  });

  it('sign in and navigate back home', async () => {
    sandbox.stub(sessionService, 'processCallback')
      .returns(Promise.resolve());
    sandbox.stub(clientService, 'navigate');
    const wrapper = view();
    expect(wrapper.html()).to.contain('Signing in...');
    expect(clientService.navigate).to.not.be.called;
    await timeout(1);
    expect(wrapper.html()).to.contain('Signing in...');
    expect(clientService.navigate).to.be.called;
  });

});
