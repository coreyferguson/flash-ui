
import React from 'react';
import OAuthCallbackView from '../../src/authentication/OAuthCallbackView';
import { expect, sinon, shallow, sandbox } from '../support/TestUtilities';
import clientService from '../support/stubs/clientServiceStub';
import sessionService from '../support/stubs/authentication/sessionServiceStub';

describe('OAuthCallbackView', () => {

  const sandbox = sinon.createSandbox();
  const view = () => shallow(
    <OAuthCallbackView
      clientService={clientService}
      sessionService={sessionService} />
  );
  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

  afterEach(() => {
    sandbox.restore();
  });

  it('process callback and navigate home', () => {
    sandbox.stub(sessionService, 'processCallback')
      .returns(Promise.resolve());
    sandbox.stub(clientService, 'navigate');
    const wrapper = view();
    expect(wrapper.html()).to.contain('Validating credentials...');
    expect(clientService.navigate).to.not.be.called;
    return timeout(1).then(() => {
      expect(wrapper.html()).to.contain('Validating credentials...');
    expect(clientService.navigate).to.be.called;
    });
  });

});
