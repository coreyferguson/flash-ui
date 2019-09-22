
import React from 'react';
import ErrorBoundary from '../../src/ErrorBoundary';
import { expect, sinon, shallowRouter as shallow } from '../support/TestUtilities';
import logger from '../support/stubs/loggerStub';

describe('ErrorBoundary', () => {

  const sandbox = sinon.createSandbox();
  const Content = () => <h1>Content</h1>;
  const view = () => shallow({
    component: ErrorBoundary,
    instance: <ErrorBoundary logger={logger}><Content /></ErrorBoundary>
  });

  it('successful execution of ErrorBoundary', () => {
    const wrapper = view();
    expect(wrapper.html()).to.eql('<h1>Content</h1>');
  });

  it('error within ErrorBoundary', () => {
    const component = view();
    component.setState({ error: new Error('oops') });
    expect(component.html()).to.contain('Unknown error');
    expect(component.html()).to.contain('oops');
  });

  it('componentDidCatch - logs to error', () => {
    sandbox.stub(logger, 'error');
    const component = view();
    component.instance().componentDidCatch(new Error('oops'), 'errorInfoValue');
    expect(logger.error).to.be.calledOnce;
  });
});
