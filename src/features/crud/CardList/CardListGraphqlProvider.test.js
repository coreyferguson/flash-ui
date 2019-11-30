
import React from 'react';
import View from './CardListGraphqlProvider';
import { expect, shallow, sinon } from '../../../test/support/TestUtilities';
import * as ReactHooks from '@apollo/react-hooks';
import Interim from '../../Interim';

const CardListView = ({ id }) => <div key={id}>{id}</div>;

describe('CardListGraphqlProvider', () => {

  const sandbox = sinon.createSandbox();
  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

  const newCardListGraphqlProvider = (useQueryResponse) => {
    const useQuery = sandbox.stub().callsFake(() => useQueryResponse || { loading: true });
    return shallow(<View CardListView={CardListView} useQuery={useQuery} />);
  }

  afterEach(() => {
    sandbox.restore();
  });

  it('list cards', () => {
    const useQueryResponse = {
      loading: false,
      data: { me: { cards: { items: [] } } },
      error: undefined
    };
    const wrapper = newCardListGraphqlProvider(useQueryResponse);
    expect(wrapper.find(CardListView).length).to.equal(1);
  });

  it('loading', () => {
    const mocks = [];
    const wrapper = newCardListGraphqlProvider();
    expect(wrapper.find(CardListView).length).to.equal(0);
    expect(wrapper.find(Interim)).to.exist;
  });

  it('error', () => {
    const useQueryResponse = { loading: false, data: undefined, error: new Error('oops') };
    const wrapper = newCardListGraphqlProvider(useQueryResponse);
    expect(wrapper.find(CardListView).length).to.equal(0);
    expect(wrapper.text()).to.contain('unknown error');
  });

});
