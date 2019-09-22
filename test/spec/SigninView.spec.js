
import React from 'react';
import SigninView from '../../src/authentication/SigninView';
import { expect, sinon, shallowRouter as shallow, sandbox } from '../support/TestUtilities';
import clientService from '../support/stubs/clientServiceStub';
import sessionService from '../support/stubs/authentication/sessionServiceStub';
import Interim from '../../src/Interim';

describe('SigninView', () => {

  const sandbox = sinon.createSandbox();
  const view = () => shallow({
    component: SigninView,
    instance: <SigninView
      clientService={clientService}
      sessionService={sessionService} />
  });
  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

  afterEach(() => {
    sandbox.restore();
  });

  it('sign in and navigate back home', async () => {
    sandbox.stub(sessionService, 'processCallback')
      .returns(Promise.resolve());
    sandbox.stub(clientService, 'navigate');
    const wrapper = view();
    expect(wrapper.find(Interim).length).to.equal(1);
    expect(clientService.navigate).to.not.be.called;
    await timeout(1);
    expect(wrapper.find(Interim).length).to.equal(1);
    expect(clientService.navigate).to.be.called;
  });

});
