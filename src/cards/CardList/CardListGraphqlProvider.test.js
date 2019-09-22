
import React from 'react';
import View, { LIST_CARDS } from './CardListGraphqlProvider';
import { expect, mountGraphqlProvider, sinon } from '../../../test/support/TestUtilities';

const CardListView = ({ id }) => <div key={id}>{id}</div>;

describe('CardListGraphqlProvider', () => {

  const sandbox = sinon.createSandbox();
  const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

  afterEach(() => {
    sandbox.restore();
  });

  it('list cards', async () => {
    const mocks = [{
      request: { query: LIST_CARDS },
      result: {
        data: {
          me: {
            cards: {
              items: []
            }
          }
        }
      }
    }];
    const wrapper = mountGraphqlProvider({
      component: View,
      instance: <View CardListView={CardListView} />,
      mocks
    });
    await timeout(1);
    wrapper.update();
    expect(wrapper.find(CardListView).length).to.equal(1);
  });

  it('loading', () => {
    const mocks = [];
    const wrapper = mountGraphqlProvider({
      component: View,
      instance: <View CardListView={CardListView} />,
      mocks
    });
    expect(wrapper.find(CardListView).length).to.equal(0);
    expect(wrapper.text()).to.contain('loading');
  });

  it('error', async () => {
    const mocks = [{
      request: { query: LIST_CARDS },
      error: new Error('oops')
    }];
    const wrapper = mountGraphqlProvider({
      component: View,
      instance: <View CardListView={CardListView} />,
      mocks
    });
    await timeout(1);
    wrapper.update();
    expect(wrapper.find(CardListView).length).to.equal(0);
    expect(wrapper.text()).to.contain('unknown error');
  });

});
