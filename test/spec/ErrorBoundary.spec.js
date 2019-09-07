
import React from 'react';
import ErrorBoundary from '../../src/ErrorBoundary';
import { expect, sinon, shallow } from '../support/TestUtilities';
import logger from '../support/stubs/loggerStub';

describe('ErrorBoundary', () => {

  const sandbox = sinon.createSandbox();
  const Content = () => <h1>Content</h1>;
  const view = () => shallow(
    <ErrorBoundary logger={logger}>
      <Content />
    </ErrorBoundary>
  );

  it('successful execution of ErrorBoundary', () => {
    const wrapper = view();
    expect(wrapper.html()).to.eql('<h1>Content</h1>');
  });

  it('error within ErrorBoundary', () => {
    const wrapper = view();
    const component = wrapper.find('ErrorBoundary').dive();
    component.setState({ error: new Error('oops') });
    expect(component.html()).to.contain('Unknown error');
    expect(component.html()).to.contain('oops');
  });

  it('componentDidCatch - logs to error', () => {
    sandbox.stub(logger, 'error');
    const wrapper = view();
    const component = wrapper.find('ErrorBoundary').dive();
    component.instance().componentDidCatch(new Error('oops'), 'errorInfoValue');
    expect(logger.error).to.be.calledOnce;
  });
});
