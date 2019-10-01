
import React from 'react';
import PracticeController, { ViewState } from './PracticeController';
import { expect, shallow, sinon } from '../../test/support/TestUtilities';
import PracticeView from './PracticeView';

describe('PracticeController', () => {

  it('error retrieving cards on first fetch', () => {
    const useQuery = sinon.stub().returns({ loading: false, error: new Error('oops') });
    const wrapper = shallow(newController({ useQuery }));
    expect(wrapper.find('UnknownError')).to.exist;
  });

  it('create new practice deck when there are no cards', () => {
    const newPracticeDeck = sinon.spy();
    const wrapper = shallow(newController(
      {
        useQuery: sinon.stub().returns({ loading: false, data: newUseQueryData() }),
        useMutation: sinon.stub().returns([ newPracticeDeck, { loading: false } ])
      },
      {
        viewState: ViewState.FETCH_PRACTICE_CARDS
      }));
    expect(newPracticeDeck).to.be.calledOnce;
  });

  it('show unknown error when refetching cards', () => {
    const newPracticeDeck = sinon.spy();
    const wrapper = shallow(newController(null, {
      useQueryLoading: false,
      viewState: ViewState.REFETCH_PRACTICE_CARDS_ERROR
    }));
    expect(wrapper.find('UnknownError')).to.exist;
  });

  it('set error state when refetch fails', async () => {
    const refetch = sinon.stub().returns(Promise.reject(new Error('oops')));
    const setViewState = sinon.spy();
    const wrapper = shallow(newController(
      {
        useState: sinon.stub().returns([ ViewState.NEW_PRACTICE_DECK, setViewState ]),
        useQuery: sinon.stub().returns({ loading: false, data: newUseQueryData(), refetch })
      }));
    await timeout(1);
    expect(setViewState).to.be.calledTwice;
  });

  it('error retrieving practice deck even after creating', () => {
    const wrapper = shallow(newController(null, {
      useQueryLoading: false,
      viewState: ViewState.REFETCH_PRACTICE_CARDS_COMPLETE
    }));
    expect(wrapper.find('ErrorMessageView')).to.exist;
  });

  it('show first card returned from practice deck', () => {
    const wrapper = shallow(newController({
      useQuery: sinon.stub().returns({
        loading: false,
        data: newUseQueryData(2)
      })
    }));
    expect(wrapper.find(PracticeView).prop('card').id).to.equal('id1')
  });

  it('remind me immediately = append card to end of current practice deck');

  it('remind me often = attach frequency-often label');

  it('remind me sometimes = attach frequency-sometimes label');

  it('remind me never = remove frequency labels');

});

/**
 * @returns {@type PracticeController}
 */
function newController(propsOverride, quickSettings={}) {
  const { useQueryLoading, viewState } = quickSettings;
  const useQueryData = useQueryLoading === false ? newUseQueryData() : undefined;
  const props = Object.assign({
    useMutation: sinon.stub().returns([
      sinon.spy(),
      { loading: false }
    ]),
    useQuery: sinon.stub().returns({
      loading: useQueryLoading !== undefined ? useQueryLoading : true,
      data: useQueryData,
      refetch: sinon.stub().returns(Promise.resolve())
    }),
    useState: sinon.stub().returns([
      viewState || ViewState.FETCH_PRACTICE_CARDS,
      sinon.spy()
    ])
  }, propsOverride);
  return <PracticeController {...props} />;
}

/**
 * Creates a mock data object for useQuery with default values.
 * @param {Number} numberOfCards number of cards to create
 */
function newUseQueryData(numberOfCards) {
  const items = [];
  for (let i=1; i<=numberOfCards; i++) {
    items.push({
      id: `id${i}`,
      labels: ['frequency-often', 'practice'],
      sideAText: `side A text ${i}`,
      sideBText: `side B text ${i}`
    });
  }
  return { me: { sub: 'sub1', cards: { items } } };
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}