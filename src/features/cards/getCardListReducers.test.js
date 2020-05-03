import { initialState, reducer, actions } from './cardsSlice';

describe('card list reducers', () => {
  describe('activeSide', () => {
    test('flipCard - with existing state', () => {
      const stateBefore = Object.assign({}, initialState, { activeSides: { idValue1: 'A', idValue2: 'B' } });
      const stateAfterFirstFlip = reducer(stateBefore, actions.flipCard('idValue1'));
      expect(stateAfterFirstFlip.activeSides.idValue1).toBe('B');
      const stateAfterSecondFlip = reducer(stateAfterFirstFlip, actions.flipCard('idValue2'));
      expect(stateAfterSecondFlip.activeSides.idValue1).toBe('B');
      expect(stateAfterSecondFlip.activeSides.idValue2).toBe('A');
    });

    test('flipCard - without existing state', () => {
      const stateAfterFirstFlip = reducer(initialState, actions.flipCard('idValue1'));
      expect(stateAfterFirstFlip.activeSides.idValue1).toBe('B');
    });
  });

  describe('fetchCard', () => {
    test('fetchCard - set loading to true', () => {
      const actual = reducer(initialState, actions.fetchCard());
      const expected = Object.assign({}, initialState, { isLoading: true, isLoadingFetchCard: true });
      expect(actual).toEqual(expected);
    });

    test('fetchCardResponse - set loading to false', () => {
      const res = mockFetchCardResponse();
      const actual = reducer(initialState, actions.fetchCardResponse(res));
      expect(actual.isLoading).toBe(false);
      expect(actual.isLoadingFetchCard).toBe(false);
    });

    test('fetchCardResponse - continue loading if fetchCards is in-progress', () => {
      const res = mockFetchCardResponse();
      const state = Object.assign({}, initialState, { isLoadingFetchCards: true })
      const actual = reducer(state, actions.fetchCardResponse(res));
      expect(actual.isLoading).toBe(true);
      expect(actual.isLoadingFetchCards).toBe(true);
      expect(actual.isLoadingFetchCard).toBe(false);
    });

    test('fetchCardResponse - set card cardMap for first time', () => {
      const res = mockFetchCardResponse({ id: 'idValue1' });
      const actual = reducer(initialState, actions.fetchCardResponse(res));
      expect(actual.cardMap).toEqual({ idValue1: { id: 'idValue1' } });
    });

    test('fetchCardResponse - append to existing card cardMap', () => {
      const state = Object.assign({}, initialState, {
        cardMap: { idValue1: { id: 'idValue1' }}
      });
      const res = mockFetchCardResponse({ card: { id: 'idValue2' } });
      const actual = reducer(state, actions.fetchCardResponse(res));
      expect(Object.keys(actual.cardMap)).toHaveLength(2);
      expect(actual.cardMap['idValue1'].id).toBe('idValue1');
      expect(actual.cardMap['idValue2'].id).toBe('idValue2');
    });

    test('fetchCardResponse - modify existing card item', () => {
      const state = Object.assign({}, initialState, {
        cardMap: { idValue1: { id: 'idValue1', label: 'oldValue' }}
      });
      const res = mockFetchCardResponse({ card: { id: 'idValue1', label: 'newValue' } });
      const actual = reducer(state, actions.fetchCardResponse(res));
      expect(Object.keys(actual.cardMap)).toHaveLength(1);
      expect(actual.cardMap['idValue1']).toEqual({ id: 'idValue1', label: 'newValue' });
    });

    test('fetchCardError - set loading to false', () => {
      const state = Object.assign({}, initialState, { isLoading: true });
      const actual = reducer(state, actions.fetchCardError(new Error('oops')));
      expect(actual.isLoading).toBe(false);
      expect(actual.isLoadingFetchCard).toBe(false);
    });

    test('fetchCardError - continue loading if fetchCard is in-progress', () => {
      const state = Object.assign({}, initialState, { isLoading: true, isLoadingFetchCards: true });
      const actual = reducer(state, actions.fetchCardError(new Error('oops')));
      expect(actual.isLoading).toBe(true);
      expect(actual.isLoadingFetchCard).toBe(false);
    });

    test('fetchCardError - set error object', () => {
      const state = Object.assign({}, initialState, { isLoading: true });
      const actual = reducer(state, actions.fetchCardError(new Error('oops')));
      expect(actual.error).not.toBe(undefined);
    });
  });

  describe('fetchCards', () => {
    test('fetchCards - set loading to true', () => {
      const actual = reducer(initialState, actions.fetchCards());
      const expected = Object.assign({}, initialState, { isLoading: true, isLoadingFetchCards: true });
      expect(actual).toEqual(expected);
    });

    test('fetchCardsResponse - set loading to false', () => {
      const res = mockFetchCardsResponse();
      const actual = reducer(initialState, actions.fetchCardsResponse(res));
      expect(actual.isLoading).toBe(false);
      expect(actual.isLoadingFetchCards).toBe(false);
    });

    test('fetchCardsResponse - continue loading if fetchCard is in-progress', () => {
      const res = mockFetchCardsResponse();
      const state = Object.assign({}, initialState, { isLoadingFetchCard: true })
      const actual = reducer(state, actions.fetchCardsResponse(res));
      expect(actual.isLoading).toBe(true);
      expect(actual.isLoadingFetchCard).toBe(true);
      expect(actual.isLoadingFetchCards).toBe(false);
    });

    test('fetchCardsResponse - set card cardMap for first time', () => {
      const res = mockFetchCardsResponse({ items: [{ id: 'idValue1' }] });
      const actual = reducer(initialState, actions.fetchCardsResponse(res));
      expect(actual.cardMap).toEqual({ 'idValue1': { id: 'idValue1' } });
    });

    test('fetchCardsResponse - append to existing card cardMap', () => {
      const state = Object.assign({}, initialState, {
        cardMap: { idValue1: { id: 'idValue1' }}
      });
      const res = mockFetchCardsResponse({ items: [{ id: 'idValue2' }] });
      const actual = reducer(state, actions.fetchCardsResponse(res));
      expect(Object.keys(actual.cardMap)).toHaveLength(2);
      expect(actual.cardMap['idValue1'].id).toBe('idValue1');
      expect(actual.cardMap['idValue2'].id).toBe('idValue2');
    });

    test('fetchCardsResponse - modify existing card item', () => {
      const state = Object.assign({}, initialState, {
        cardMap: { idValue1: { id: 'idValue1', label: 'oldValue' }}
      });
      const res = mockFetchCardsResponse({ items: [{ id: 'idValue1', label: 'newValue' }] });
      const actual = reducer(state, actions.fetchCardsResponse(res));
      expect(Object.keys(actual.cardMap)).toHaveLength(1);
      expect(actual.cardMap['idValue1']).toEqual({ id: 'idValue1', label: 'newValue' });
    });

    test('fetchCardsResponse - set card "fetchCardsNextCursor" cursor when theres another page of cards', () => {
      const res = mockFetchCardsResponse({ next: 'nextValue' });
      const actual = reducer(initialState, actions.fetchCardsResponse(res));
      expect(actual.fetchCardsNextCursor).toBe('nextValue');
    });

    test('fetchCardsResponse - set card "fetchCardsNextCursor" cursor after reaching the last page', () => {
      const res = mockFetchCardsResponse({ next: undefined });
      const state = Object.assign({}, initialState, { fetchCardsNextCursor: 'nextValue' });
      const actual = reducer(state, actions.fetchCardsResponse(res));
      expect(actual.fetchCardsNextCursor).toBe(undefined);
    });

    test('fetchCardsResponse - set isFetchCardsAlreadyCompletedOnce to true on first completion', () => {
      const res = mockFetchCardsResponse();
      const actual = reducer(initialState, actions.fetchCardsResponse(res));
      expect(actual.isFetchCardsAlreadyCompletedOnce).toBe(true);
    });

    test('fetchCardsError - set loading to false', () => {
      const state = Object.assign({}, initialState, { isLoading: true });
      const actual = reducer(state, actions.fetchCardsError(new Error('oops')));
      expect(actual.isLoading).toBe(false);
      expect(actual.isLoadingFetchCards).toBe(false);
    });

    test('fetchCardsError - continue loading if fetchCard is in-progress', () => {
      const state = Object.assign({}, initialState, { isLoading: true, isLoadingFetchCard: true });
      const actual = reducer(state, actions.fetchCardsError(new Error('oops')));
      expect(actual.isLoading).toBe(true);
      expect(actual.isLoadingFetchCards).toBe(false);
    });

    test('fetchCardsError - set error object', () => {
      const state = Object.assign({}, initialState, { isLoading: true });
      const actual = reducer(state, actions.fetchCardsError(new Error('oops')));
      expect(actual.error).not.toBe(undefined);
    });
  });

  describe('order of cards', () => {
    it('fetchCards - maintains order', () => {
      const res = mockFetchCardsResponse({ items: [{ id: 'idValue1' }, { id: 'idValue2' }] });
      const stateAfter = reducer(initialState, actions.fetchCardsResponse(res));
      expect(stateAfter.cardsOrderByCreationDate).toEqual([ 'idValue1', 'idValue2' ]);
    });

    it('fetchCards - does not change order of existing cardMap', () => {
      const stateBefore = Object.assign({}, initialState, { cardsOrderByCreationDate: ['idValue2'] });
      const res = mockFetchCardsResponse({ items: [{ id: 'idValue1' }, { id: 'idValue2' }, { id: 'idValue3' }] });
      const stateAfter = reducer(stateBefore, actions.fetchCardsResponse(res));
      expect(stateAfter.cardsOrderByCreationDate).toEqual([ 'idValue2', 'idValue1', 'idValue3' ]);
    });
  });
});

function mockFetchCardsResponse(overrides) {
  overrides = overrides || {};
  const items = overrides.items || [{ id: 'idValue1' }];
  const next = overrides.next || undefined;
  return { data: { me: { cards: { items, next } } } };
}

function mockFetchCardResponse(overrides) {
  overrides = overrides || {};
  const card = overrides.card || { id: 'idValue1' };
  return { data: { me: { card } } };
}