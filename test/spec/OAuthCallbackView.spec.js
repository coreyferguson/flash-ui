
import clientService from '../support/stubs/clientServiceStub';
import Interim from '../../src/Interim';
import OAuthCallbackView from '../../src/authentication/OAuthCallbackView';
import React from 'react';
import sessionService from '../support/stubs/authentication/sessionServiceStub';
import { expect, sinon, shallowRouter as shallow, sandbox } from '../support/TestUtilities';

describe('OAuthCallbackView', () => {

  const sandbox = sinon.createSandbox();
  const view = () => shallow({
    component: OAuthCallbackView,
    instance: <OAuthCallbackView
      clientService={clientService}
      sessionService={sessionService} />
  });
  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

  afterEach(() => {
    sandbox.restore();
  });

  it('process callback and navigate home', async () => {
    sandbox.stub(sessionService, 'processCallback')
      .returns(Promise.resolve());
    sandbox.stub(clientService, 'navigate');
    const wrapper = view();
    expect(wrapper.find(Interim)).to.exist;
    expect(clientService.navigate).to.not.be.called;
    await timeout(0);
    expect(wrapper.find(Interim)).to.exist;
    expect(clientService.navigate).to.be.called;
  });

});
