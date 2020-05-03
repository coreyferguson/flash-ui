import { initialState, reducer, actions } from '../cardsSlice';

describe('practice reducers', () => {
  describe('fetchPracticeCards', () => {
    test('fetchPracticeCards - set loading to true', () => {
      const actual = reducer(initialState, actions.fetchPracticeCards());
      const expected = Object.assign({}, initialState, { isLoading: true, isLoadingFetchPracticeCards: true });
      expect(actual).toEqual(expected);
    });

    test('fetchPracticeCardsResponse - set loading to false', () => {
      const res = mockFetchPracticeCardsResponse();
      const actual = reducer(initialState, actions.fetchPracticeCardsResponse(res));
      expect(actual.isLoading).toBe(false);
      expect(actual.isLoadingFetchPracticeCards).toBe(false);
    });

    test('fetchPracticeCardsResponse - continue loading if fetchCard is in-progress', () => {
      const res = mockFetchPracticeCardsResponse();
      const state = Object.assign({}, initialState, { isLoadingFetchCard: true })
      const actual = reducer(state, actions.fetchPracticeCardsResponse(res));
      expect(actual.isLoading).toBe(true);
      expect(actual.isLoadingFetchCard).toBe(true);
      expect(actual.isLoadingFetchPracticeCards).toBe(false);
    });

    test('fetchPracticeCardsResponse - set cardMap for first time', () => {
      const res = mockFetchPracticeCardsResponse({ items: [{ id: 'idValue1' }] });
      const actual = reducer(initialState, actions.fetchPracticeCardsResponse(res));
      expect(actual.cardMap).toEqual({ 'idValue1': { id: 'idValue1' } });
    });

    test('fetchPracticeCardsResponse - append to existing card cardMap', () => {
      const state = Object.assign({}, initialState, {
        cardMap: { idValue1: { id: 'idValue1' }}
      });
      const res = mockFetchPracticeCardsResponse({ items: [{ id: 'idValue2' }] });
      const actual = reducer(state, actions.fetchPracticeCardsResponse(res));
      expect(Object.keys(actual.cardMap)).toHaveLength(2);
      expect(actual.cardMap['idValue1'].id).toBe('idValue1');
      expect(actual.cardMap['idValue2'].id).toBe('idValue2');
    });

    test('fetchPracticeCardsResponse - modify existing card item', () => {
      const state = Object.assign({}, initialState, {
        cardMap: { idValue1: { id: 'idValue1', label: 'oldValue' }}
      });
      const res = mockFetchPracticeCardsResponse({ items: [{ id: 'idValue1', label: 'newValue' }] });
      const actual = reducer(state, actions.fetchPracticeCardsResponse(res));
      expect(Object.keys(actual.cardMap)).toHaveLength(1);
      expect(actual.cardMap['idValue1']).toEqual({ id: 'idValue1', label: 'newValue' });
    });

    test('fetchPracticeCardsResponse - response overrides previous deck', () => {
      const stateBefore = { ...initialState, cardsOrderByLastTestTime: ['idValue2', 'idValue1'] };
      const res = mockFetchPracticeCardsResponse({ items: [{ id: 'idValue1' }, { id: 'idValue2' }] });
      const stateAfter = reducer(stateBefore, actions.fetchPracticeCardsResponse(res));
      expect(stateAfter.cardsOrderByLastTestTime).toEqual(['idValue1', 'idValue2']);
    });

    test('fetchPracticeCardsResponse - isCreationOfPracticeCardsPossible reset to true', () => {
      const stateBefore = { ...initialState, isCreationOfPracticeCardsPossible: false };
      const stateAfter = reducer(stateBefore, actions.fetchPracticeCardsResponse(mockFetchPracticeCardsResponse()));
      expect(stateAfter.isCreationOfPracticeCardsPossible).toBe(true);
    });

    test('fetchPracticeCardsError - set loading to false', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const state = Object.assign({}, initialState, { isLoading: true });
      const actual = reducer(state, actions.fetchPracticeCardsError(new Error('oops')));
      expect(actual.isLoading).toBe(false);
      expect(actual.isLoadingFetchPracticeCards).toBe(false);
    });

    test('fetchPracticeCardsError - continue loading if fetchCard is in-progress', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const state = Object.assign({}, initialState, { isLoading: true, isLoadingFetchCard: true });
      const actual = reducer(state, actions.fetchPracticeCardsError(new Error('oops')));
      expect(actual.isLoading).toBe(true);
      expect(actual.isLoadingFetchPracticeCards).toBe(false);
    });

    test('fetchPracticeCardsCreationNotPossible', () => {
      const stateBefore = {
        ...initialState,
        isCreationOfPracticeCardsPossible: true,
        isLoading: true,
        isLoadingFetchPracticeCards: true,
      };
      const stateAfter = reducer(stateBefore, actions.fetchPracticeCardsCreationNotPossible());
      expect(stateAfter.isCreationOfPracticeCardsPossible).toBe(false);
      expect(stateAfter.isLoading).toBe(false);
      expect(stateAfter.isLoadingFetchCard).toBe(false);
    });
  });
});

describe('remindMe', () => {
  test('remind me immediately', () => {
    const stateBefore = { ...initialState, cardsOrderByLastTestTime: [ '1', '2', '3' ] };
    const stateAfter = reducer(stateBefore, actions.remindMe({ frequency: 'immediately' }));
    expect(stateAfter.cardsOrderByLastTestTime).toEqual([ '2', '3', '1' ]);
  });

  test('remind me often', () => {
    const stateBefore = { ...initialState, cardsOrderByLastTestTime: [ '1', '2', '3' ] };
    const stateAfter = reducer(stateBefore, actions.remindMe({ frequency: 'often' }));
    expect(stateAfter.cardsOrderByLastTestTime).toEqual([ '2', '3' ]);
  });

  test('remind me sometimes', () => {
    const stateBefore = { ...initialState, cardsOrderByLastTestTime: [ '1', '2', '3' ] };
    const stateAfter = reducer(stateBefore, actions.remindMe({ frequency: 'sometimes' }));
    expect(stateAfter.cardsOrderByLastTestTime).toEqual([ '2', '3' ]);
  });

  test('flip card to front', () => {
    const stateBefore = {
      ...initialState,
      cardsOrderByLastTestTime: [ '1', '2', '3' ],
      activeSides: { '1': 'B', '2': 'A', '3': 'A', }
    };
    const stateAfter = reducer(stateBefore, actions.remindMe({ frequency: 'immediately' }));
    expect(stateAfter.cardsOrderByLastTestTime).toEqual([ '2', '3', '1' ]);
    expect(stateAfter.activeSides['1']).toBe('A');
  });
});

function mockFetchPracticeCardsResponse(overrides = {}) {
  return { items: overrides.items || [{ id: 'idValue1' }] };
}