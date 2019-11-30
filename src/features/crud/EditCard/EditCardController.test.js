
import EditCardController from './EditCardController';
import React from 'react';
import { expect, shallow, sinon } from '../../../test/support/TestUtilities';
import sessionService from '../../authentication/sessionService';
import EditCardView from './EditCardView';
import Interim from '../../Interim';

describe('EditCardController', () => {

  const sandbox = sinon.createSandbox();
  const stubUserSession = () => ({ idToken: { payload: { sub: 'subValue' } } });
  let redirectAfterSave;
  const newEditCardController = useMutationResponse => {
    useMutationResponse = useMutationResponse || { loading: true };
    const useMutationStub = sinon.stub().returns(useMutationResponse);
    return shallow(<EditCardController redirectAfterSave={redirectAfterSave} useMutation={useMutationStub} />);
  };

  beforeEach(() => {
    sandbox.stub(sessionService, 'getSignInUserSession').returns(stubUserSession());
    redirectAfterSave = new sinon.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('renders with no surprises', () => {
    const mocks = [];
    const useMutationResponse = [ sinon.spy(), { loading: false, called: false, error: undefined } ];
    const wrapper = newEditCardController(useMutationResponse);
    expect(wrapper.find(EditCardView)).to.exist;
    expect(redirectAfterSave).to.not.be.called;
    expect(wrapper.find(Interim)).to.not.exist;
    expect(wrapper.find('ErrorMessageView')).to.not.exist;
  });

  it('loading', () => {
    const useMutationResponse = [ sinon.spy(), { loading: true, called: true, error: undefined } ];
    const wrapper = newEditCardController(useMutationResponse);
    expect(wrapper.find(EditCardView)).to.not.exist;
    expect(redirectAfterSave).to.not.be.called;
    expect(wrapper.find(Interim)).to.exist;
    expect(wrapper.find('ErrorMessageView')).to.not.exist;
  });

  it('successful mutation', () => {
    const useMutationResponse = [ sinon.spy(), { loading: false, called: true, error: undefined } ];
    const wrapper = newEditCardController(useMutationResponse);
    expect(wrapper.find(EditCardView)).to.not.exist;
    expect(redirectAfterSave).to.be.calledOnce;
    expect(wrapper.find(Interim)).to.exist;
    expect(wrapper.find('ErrorMessageView')).to.not.exist;
  });

  it('error on mutation', () => {
    const useMutationResponse = [ sinon.spy(), { loading: false, called: true, error: new Error('oops') } ];
    const wrapper = newEditCardController(useMutationResponse);
    expect(wrapper.find(EditCardView)).to.exist;
    expect(redirectAfterSave).to.not.be.called;
    expect(wrapper.find(Interim)).to.not.exist;
    expect(wrapper.find('ErrorMessageView')).to.exist;
  });

  it('clicking button triggers save', () => {
    const useMutationResponse = [ sinon.spy(), { loading: false, called: false, error: undefined } ];
    const wrapper = newEditCardController(useMutationResponse);
    wrapper.find(EditCardView).prop('onSave')({});
    expect(useMutationResponse[0]).to.be.calledWith({ variables: { userId: 'subValue' } });
  });

});
