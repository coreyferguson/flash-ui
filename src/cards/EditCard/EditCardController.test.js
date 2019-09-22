
import EditCardController, { SAVE_CARD } from './EditCardController';
import React from 'react';
import { expect, mountGraphqlProvider, sinon } from '../../../test/support/TestUtilities';
import sessionService from '../../authentication/sessionService';

describe('EditCardController', () => {

  const sandbox = sinon.createSandbox();
  const stubUserSession = () => ({ idToken: { payload: { sub: 'subValue' } } });
  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
  const RedirectStub = () => <React.Fragment></React.Fragment>;
  const stubQueryResult = (variables, result, error) => ({
    request: { query: SAVE_CARD, variables },
    result: (result) ? { data: { upsertCard: result } } : undefined,
    error
  });

  beforeEach(() => {
    sandbox.stub(sessionService, 'getSignInUserSession').returns(stubUserSession());
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders with no surprises', () => {
    const mocks = [];
    const wrapper = mountGraphqlProvider({
      component: EditCardController,
      instance: <EditCardController />,
      mocks
    });
    expect(wrapper.find('EditCardView')).to.exist;
    expect(wrapper.find('RedirectStub')).to.not.exist;
    expect(wrapper.find('Loading')).to.not.exist;
    expect(wrapper.find('ErrorMessageView')).to.not.exist;
  });

  it('loading', () => {
    const wrapper = mountGraphqlProvider({
      component: EditCardController,
      instance: <EditCardController />,
      mocks: []
    });
    wrapper.find('EditCardView').props().onSave({
      userId: 'userIdValue',
      labels: [],
      sideAText: 'sideATextValue',
      sideAImageUrl: 'sideAImageUrlValue',
      sideBText: 'sideBTextValue',
      sideBImageUrl: 'sideBImageUrlValue'
    });
    wrapper.update();
    expect(wrapper.find('EditCardView')).to.exist;
    expect(wrapper.find('RedirectStub')).to.not.exist;
    expect(wrapper.find('Loading')).to.exist;
    expect(wrapper.find('ErrorMessageView')).to.not.exist;
  });

  it('successful mutation', async () => {
    const baseCard = {
      labels: [],
      sideAText: 'sideATextValue',
      sideAImageUrl: 'sideAImageUrlValue',
      sideBText: 'sideBTextValue',
      sideBImageUrl: 'sideBImageUrlValue'
    };
    const variables = Object.assign({}, baseCard, { userId: 'userIdValue' });
    const result = Object.assign({}, baseCard, { id: 'idValue' });
    const mocks = [ stubQueryResult(variables, result) ];
    const wrapper = mountGraphqlProvider({
      component: EditCardController,
      instance: <EditCardController Redirect={RedirectStub} />,
      mocks
    });
    wrapper.find('EditCardView').props().onSave(variables);
    await timeout(1);
    wrapper.update();
    expect(wrapper.find('EditCardView')).to.not.exist;
    expect(wrapper.find('RedirectStub')).to.exist;
    expect(wrapper.find('Loading')).to.not.exist;
    expect(wrapper.find('ErrorMessageView')).to.not.exist;
  });

  it('error on mutation', async () => {
    const variables = {
      userId: 'userIdValue',
      labels: [],
      sideAText: 'sideATextValue',
      sideAImageUrl: 'sideAImageUrlValue',
      sideBText: 'sideBTextValue',
      sideBImageUrl: 'sideBImageUrlValue'
    };
    const wrapper = mountGraphqlProvider({
      component: EditCardController,
      instance: <EditCardController Redirect={RedirectStub} />,
      mocks: [ stubQueryResult(variables, undefined, new Error('oops')) ]
    });
    wrapper.find('EditCardView').props().onSave(variables);
    await timeout(1);
    wrapper.update();
    expect(wrapper.find('EditCardView')).to.exist;
    expect(wrapper.find('RedirectStub')).to.not.exist;
    expect(wrapper.find('Loading')).to.not.exist;
    expect(wrapper.find('ErrorMessageView')).to.exist;
  });


});
