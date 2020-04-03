import {
  deleteCard, deleteCardError, deleteCardResponse,
  fetchCard, fetchCardError, fetchCardResponse,
  fetchCards, fetchCardsError, fetchCardsResponse,
  fetchImage, fetchImageError, fetchImageResponse,
  flipCard,
  initialState, reducer,
  saveCard, saveCardError, saveCardResponse,
} from './cardsSlice';

describe('cardsSlice', () => {

  describe('fetchCards', () => {
    test('fetchCards - set loading to true', () => {
      const actual = reducer(initialState, fetchCards());
      const expected = Object.assign({}, initialState, { isLoading: true, isLoadingFetchCards: true });
      expect(actual).toEqual(expected);
    });

    test('fetchCardsResponse - set loading to false', () => {
      const res = mockFetchCardsResponse();
      const actual = reducer(initialState, fetchCardsResponse(res));
      expect(actual.isLoading).toBe(false);
      expect(actual.isLoadingFetchCards).toBe(false);
    });

    test('fetchCardsResponse - continue loading if fetchCard is in-progress', () => {
      const res = mockFetchCardsResponse();
      const state = Object.assign({}, initialState, { isLoadingFetchCard: true })
      const actual = reducer(state, fetchCardsResponse(res));
      expect(actual.isLoading).toBe(true);
      expect(actual.isLoadingFetchCard).toBe(true);
      expect(actual.isLoadingFetchCards).toBe(false);
    });

    test('fetchCardsResponse - set card cardMap for first time', () => {
      const res = mockFetchCardsResponse({ items: [{ id: 'idValue1' }] });
      const actual = reducer(initialState, fetchCardsResponse(res));
      expect(actual.cardMap).toEqual({ 'idValue1': { id: 'idValue1' } });
    });

    test('fetchCardsResponse - append to existing card cardMap', () => {
      const state = Object.assign({}, initialState, {
        cardMap: { idValue1: { id: 'idValue1' }}
      });
      const res = mockFetchCardsResponse({ items: [{ id: 'idValue2' }] });
      const actual = reducer(state, fetchCardsResponse(res));
      expect(Object.keys(actual.cardMap)).toHaveLength(2);
      expect(actual.cardMap['idValue1'].id).toBe('idValue1');
      expect(actual.cardMap['idValue2'].id).toBe('idValue2');
    });

    test('fetchCardsResponse - modify existing card item', () => {
      const state = Object.assign({}, initialState, {
        cardMap: { idValue1: { id: 'idValue1', label: 'oldValue' }}
      });
      const res = mockFetchCardsResponse({ items: [{ id: 'idValue1', label: 'newValue' }] });
      const actual = reducer(state, fetchCardsResponse(res));
      expect(Object.keys(actual.cardMap)).toHaveLength(1);
      expect(actual.cardMap['idValue1']).toEqual({ id: 'idValue1', label: 'newValue' });
    });

    test('fetchCardsResponse - set card "next" cursor when theres another page of cards', () => {
      const res = mockFetchCardsResponse({ next: 'nextValue' });
      const actual = reducer(initialState, fetchCardsResponse(res));
      expect(actual.next).toBe('nextValue');
    });

    test('fetchCardsResponse - set card "next" cursor after reaching the last page', () => {
      const res = mockFetchCardsResponse({ next: undefined });
      const state = Object.assign({}, initialState, { next: 'nextValue' });
      const actual = reducer(state, fetchCardsResponse(res));
      expect(actual.next).toBe(undefined);
    });

    test('fetchCardsError - set loading to false', () => {
      const state = Object.assign({}, initialState, { isLoading: true });
      const actual = reducer(state, fetchCardsError(new Error('oops')));
      expect(actual.isLoading).toBe(false);
      expect(actual.isLoadingFetchCards).toBe(false);
    });

    test('fetchCardsError - continue loading if fetchCard is in-progress', () => {
      const state = Object.assign({}, initialState, { isLoading: true, isLoadingFetchCard: true });
      const actual = reducer(state, fetchCardsError(new Error('oops')));
      expect(actual.isLoading).toBe(true);
      expect(actual.isLoadingFetchCards).toBe(false);
    });

    test('fetchCardsError - set error object', () => {
      const state = Object.assign({}, initialState, { isLoading: true });
      const actual = reducer(state, fetchCardsError(new Error('oops')));
      expect(actual.error).not.toBe(undefined);
    });
  });

  describe('fetchCard', () => {
    test('fetchCard - set loading to true', () => {
      const actual = reducer(initialState, fetchCard());
      const expected = Object.assign({}, initialState, { isLoading: true, isLoadingFetchCard: true });
      expect(actual).toEqual(expected);
    });

    test('fetchCardResponse - set loading to false', () => {
      const res = mockFetchCardResponse();
      const actual = reducer(initialState, fetchCardResponse(res));
      expect(actual.isLoading).toBe(false);
      expect(actual.isLoadingFetchCard).toBe(false);
    });

    test('fetchCardResponse - continue loading if fetchCards is in-progress', () => {
      const res = mockFetchCardResponse();
      const state = Object.assign({}, initialState, { isLoadingFetchCards: true })
      const actual = reducer(state, fetchCardResponse(res));
      expect(actual.isLoading).toBe(true);
      expect(actual.isLoadingFetchCards).toBe(true);
      expect(actual.isLoadingFetchCard).toBe(false);
    });

    test('fetchCardResponse - set card cardMap for first time', () => {
      const res = mockFetchCardResponse({ id: 'idValue1' });
      const actual = reducer(initialState, fetchCardResponse(res));
      expect(actual.cardMap).toEqual({ idValue1: { id: 'idValue1' } });
    });

    test('fetchCardResponse - append to existing card cardMap', () => {
      const state = Object.assign({}, initialState, {
        cardMap: { idValue1: { id: 'idValue1' }}
      });
      const res = mockFetchCardResponse({ card: { id: 'idValue2' } });
      const actual = reducer(state, fetchCardResponse(res));
      expect(Object.keys(actual.cardMap)).toHaveLength(2);
      expect(actual.cardMap['idValue1'].id).toBe('idValue1');
      expect(actual.cardMap['idValue2'].id).toBe('idValue2');
    });

    test('fetchCardResponse - modify existing card item', () => {
      const state = Object.assign({}, initialState, {
        cardMap: { idValue1: { id: 'idValue1', label: 'oldValue' }}
      });
      const res = mockFetchCardResponse({ card: { id: 'idValue1', label: 'newValue' } });
      const actual = reducer(state, fetchCardResponse(res));
      expect(Object.keys(actual.cardMap)).toHaveLength(1);
      expect(actual.cardMap['idValue1']).toEqual({ id: 'idValue1', label: 'newValue' });
    });

    test('fetchCardError - set loading to false', () => {
      const state = Object.assign({}, initialState, { isLoading: true });
      const actual = reducer(state, fetchCardError(new Error('oops')));
      expect(actual.isLoading).toBe(false);
      expect(actual.isLoadingFetchCard).toBe(false);
    });

    test('fetchCardError - continue loading if fetchCard is in-progress', () => {
      const state = Object.assign({}, initialState, { isLoading: true, isLoadingFetchCards: true });
      const actual = reducer(state, fetchCardError(new Error('oops')));
      expect(actual.isLoading).toBe(true);
      expect(actual.isLoadingFetchCard).toBe(false);
    });

    test('fetchCardError - set error object', () => {
      const state = Object.assign({}, initialState, { isLoading: true });
      const actual = reducer(state, fetchCardError(new Error('oops')));
      expect(actual.error).not.toBe(undefined);
    });
  });

  describe('activeSide', () => {
    test('flipCard - with existing state', () => {
      const stateBefore = Object.assign({}, initialState, { activeSides: { idValue1: 'A', idValue2: 'B' } });
      const stateAfterFirstFlip = reducer(stateBefore, flipCard('idValue1'));
      expect(stateAfterFirstFlip.activeSides.idValue1).toBe('B');
      const stateAfterSecondFlip = reducer(stateAfterFirstFlip, flipCard('idValue2'));
      expect(stateAfterSecondFlip.activeSides.idValue1).toBe('B');
      expect(stateAfterSecondFlip.activeSides.idValue2).toBe('A');
    });

    test('flipCard - without existing state', () => {
      const stateAfterFirstFlip = reducer(initialState, flipCard('idValue1'));
      expect(stateAfterFirstFlip.activeSides.idValue1).toBe('B');
    });
  });

  describe('order of cards', () => {
    it('fetchCards - maintains order', () => {
      const res = mockFetchCardsResponse({ items: [{ id: 'idValue1' }, { id: 'idValue2' }] });
      const stateAfter = reducer(initialState, fetchCardsResponse(res));
      expect(stateAfter.cardsOrderByCreationDate).toEqual([ 'idValue1', 'idValue2' ]);
    });

    it('fetchCards - does not change order of existing cardMap', () => {
      const stateBefore = Object.assign({}, initialState, { cardsOrderByCreationDate: ['idValue2'] });
      const res = mockFetchCardsResponse({ items: [{ id: 'idValue1' }, { id: 'idValue2' }, { id: 'idValue3' }] });
      const stateAfter = reducer(stateBefore, fetchCardsResponse(res));
      expect(stateAfter.cardsOrderByCreationDate).toEqual([ 'idValue2', 'idValue1', 'idValue3' ]);
    });

    it('fetchCardResponse - maintains order', () => {
      const stateBefore = Object.assign({}, initialState, { cardsOrderByCreationDate: ['idValue2'] });
      const res = mockFetchCardResponse({ card: { id: 'idValue1',  } });
      const stateAfter = reducer(stateBefore, fetchCardResponse(res));
      expect(stateAfter.cardsOrderByCreationDate).toEqual([ 'idValue2', 'idValue1' ]);
    });

    it('fetchCardResponse - does not change order of existing cardMap', () => {
      const stateBefore = Object.assign({}, initialState, {
        cardsOrderByCreationDate: ['idValue1', 'idValue2'],
        cardMap: { 'idValue1': { id: 'idValue1' }, 'idValue2': { id: 'idValue2' } }
      });
      const res = mockFetchCardResponse({ card: { id: 'idValue1' } });
      const stateAfter = reducer(stateBefore, fetchCardResponse(res));
      expect(stateAfter.cardsOrderByCreationDate).toEqual([ 'idValue1', 'idValue2' ]);
    });
  });

  describe('fetchImage', () => {
    test('fetchImage - with existing state', () => {
      const stateBefore = Object.assign({}, initialState, {
        images: { idValue1: { A: { isLoading: false }, B: { isLoading: false } } }
      });
      let stateAfter = reducer(stateBefore, fetchImage({ id: 'idValue1', side: 'A' }));
      expect(stateAfter.images.idValue1.A.isLoading).toBe(true);
      expect(stateAfter.images.idValue1.B.isLoading).toBe(false);
      stateAfter = reducer(stateBefore, fetchImage({ id: 'idValue1', side: 'B' }));
      expect(stateAfter.images.idValue1.A.isLoading).toBe(false);
      expect(stateAfter.images.idValue1.B.isLoading).toBe(true);
    });

    test('fetchImage - without existing state', () => {
      const stateAfter = reducer(initialState, fetchImage({ id: 'idValue2', side: 'A' }));
      expect(stateAfter.images.idValue2.A.isLoading).toBe(true);
      expect(stateAfter.images.idValue2.B.isLoading).toBe(false);
    });

    test('fetchImageError - with existing state', () => {
      const stateBefore = Object.assign({}, initialState, {
        images: { idValue1: { A: { isLoading: true, error: new Error('old error') }, B: { isLoading: false } } }
      });
      const stateAfter = reducer(stateBefore, fetchImageError({ id: 'idValue1', side: 'A', error: new Error('new error') }));
      expect(stateAfter.images.idValue1.A.isLoading).toBe(false);
      expect(stateAfter.images.idValue1.A.error.message).toBe('new error');
    });

    test('fetchImageError - without existing state', () => {
      const stateAfter = reducer(initialState, fetchImageError({ id: 'idValue1', side: 'A', error: new Error('oops') }));
      expect(stateAfter.images.idValue1.A.isLoading).toBe(false);
      expect(stateAfter.images.idValue1.A.error.message).toBe('oops');
    });

    test('fetchImageResponse - with existing state', () => {
      const stateBefore = Object.assign({}, initialState, {
        images: { idValue1: { A: { isLoading: true, source: 'oldImageSourceValue' }, B: {} } }
      });
      const stateAfter = reducer(stateBefore, fetchImageResponse({ id: 'idValue1', side: 'A', source: 'imageSourceValue' }));
      expect(stateAfter.images.idValue1.A.isLoading).toBe(false);
      expect(stateAfter.images.idValue1.A.source).toBe('imageSourceValue');
    });

    test('fetchImageResponse - without existing state', () => {
      const stateAfter = reducer(initialState, fetchImageResponse({ id: 'idValue1', side: 'A', source: 'imageSourceValue' }));
      expect(stateAfter.images.idValue1.A.isLoading).toBe(false);
      expect(stateAfter.images.idValue1.A.source).toBe('imageSourceValue');
    });
  });

  describe('saveCard', () => {
    test('saveCard - set loading to true', () => {
      const stateBefore = Object.assign({}, initialState);
      const stateAfter = reducer(stateBefore, saveCard());
      expect(stateAfter.isLoading).toBe(true);
      expect(stateAfter.isLoadingSaveCard).toBe(true);
    });

    test('saveCardResponse - set loading to false', () => {
      const stateBefore = Object.assign({}, initialState, { isLoading: true, isLoadingSaveCard: true });
      const stateAfter = reducer(stateBefore, saveCardResponse({ id: '1' }));
      expect(stateAfter.isLoading).toBe(false);
      expect(stateAfter.isLoadingSaveCard).toBe(false);
    });

    test('saveCardResponse - continue loading if other actions still in-progress', () => {
      const stateBefore = Object.assign({}, initialState, {
        isLoading: true,
        isLoadingSaveCard: true,
        isLoadingFetchCard: true
      });
      const stateAfter = reducer(stateBefore, saveCardResponse({ id: '1' }));
      expect(stateAfter.isLoading).toBe(true);
      expect(stateAfter.isLoadingSaveCard).toBe(false);
      expect(stateAfter.isLoadingFetchCard).toBe(true);
    });

    test('saveCardResponse - add a new card', () => {
      const stateBefore = Object.assign({}, initialState, {
        isLoading: true,
        isLoadingSaveCard: true,
        cardsOrderByCreationDate: ['1'],
        cardMap: { '1': { id: '1' } }
      });
      const stateAfter = reducer(stateBefore, saveCardResponse({ id: '2' }));
      expect(stateAfter.cardsOrderByCreationDate).toEqual(['2', '1']);
      expect(stateAfter.cardMap['2']).toEqual({ id: '2' });
    });

    test('saveCardResponse - update existing card', () => {
      const stateBefore = Object.assign({}, initialState, {
        isLoading: true,
        isLoadingSaveCard: true,
        cardsOrderByCreationDate: ['1'],
        cardMap: { '1': { id: '1', sideAText: 'sideAText value' } }
      });
      const stateAfter = reducer(stateBefore, saveCardResponse({ id: '1', sideAText: 'sideAText updated value' }));
      expect(stateAfter.cardsOrderByCreationDate).toEqual(['1']);
      expect(stateAfter.cardMap['1']).toEqual({ id: '1', sideAText: 'sideAText updated value' });
    });

    test('saveCardError - set loading to false', () => {
      const stateBefore = Object.assign({}, initialState, { isLoading: true, isLoadingSaveCard: true });
      const stateAfter = reducer(stateBefore, saveCardError({
        message: 'message value',
        stackTrace: 'stack trace value'
      }));
      expect(stateAfter.isLoading).toBe(false);
      expect(stateAfter.isLoadingSaveCard).toBe(false);
    });

    test('saveCardError - continue loading if fetchCards is in-progress', () => {
      const stateBefore = Object.assign({}, initialState, {
        isLoading: true,
        isLoadingFetchCards: true,
        isLoadingSaveCard: true
      });
      const stateAfter = reducer(stateBefore, saveCardError({
        message: 'message value',
        stackTrace: 'stack trace value'
      }));
      expect(stateAfter.isLoading).toBe(true);
      expect(stateAfter.isLoadingFetchCards).toBe(true);
      expect(stateAfter.isLoadingSaveCard).toBe(false);
    });

    test('saveCardError - set error properties', () => {
      const stateBefore = Object.assign({}, initialState, { isLoading: true });
      const stateAfter = reducer(stateBefore, saveCardError({
        message: 'message value',
        stackTrace: 'stack trace value'
      }));
      expect(stateAfter.errorMessage).toBe('message value');
      expect(stateAfter.errorStackTrace).toBe('stack trace value');
    });
  });

  describe('deleteCard', () => {
    test('deleteCard - set loading to true', () => {
      const stateBefore = Object.assign({}, initialState);
      const stateAfter = reducer(stateBefore, deleteCard());
      expect(stateAfter.isLoading).toBe(true);
      expect(stateAfter.isLoadingDeleteCard).toBe(true);
    });

    test('deleteCard - set loading to false', () => {
      const stateBefore = Object.assign({}, initialState, { isLoading: true, isLoadingDeleteCard: true });
      const stateAfter = reducer(stateBefore, deleteCardResponse('1'));
      expect(stateAfter.isLoading).toBe(false);
      expect(stateAfter.isLoadingDeleteCard).toBe(false);
    });

    test('deleteCardResponse - continue loading if other actions still in-progress', () => {
      const stateBefore = Object.assign({}, initialState, {
        isLoading: true,
        isLoadingDeleteCard: true,
        isLoadingFetchCard: true
      });
      const stateAfter = reducer(stateBefore, deleteCardResponse('1'));
      expect(stateAfter.isLoading).toBe(true);
      expect(stateAfter.isLoadingDeleteCard).toBe(false);
      expect(stateAfter.isLoadingFetchCard).toBe(true);
    });

    test('deleteCardResponse - delete a card', () => {
      const stateBefore = Object.assign({}, initialState, {
        isLoading: true,
        isLoadingDeleteCard: true,
        cardsOrderByCreationDate: ['1', '2'],
        cardMap: { '1': { id: '1' }, '2': { id: '2' } }
      });
      const stateAfter = reducer(stateBefore, deleteCardResponse('2'));
      expect(stateAfter.cardsOrderByCreationDate).toEqual(['1']);
      expect(stateAfter.cardMap['1']).toEqual({ id: '1' });
      expect(stateAfter.cardMap['2']).toBeUndefined();
    });
  });

  test('deleteCardError - set loading to false', () => {
    const stateBefore = Object.assign({}, initialState, { isLoading: true, isLoadingDeleteCard: true });
    const stateAfter = reducer(stateBefore, deleteCardError({
      message: 'message value',
      stackTrace: 'stack trace value'
    }));
    expect(stateAfter.isLoading).toBe(false);
    expect(stateAfter.isLoadingDeleteCard).toBe(false);
  });

  test('deleteCardError - continue loading if fetchCards is in-progress', () => {
    const stateBefore = Object.assign({}, initialState, {
      isLoading: true,
      isLoadingFetchCards: true,
      isLoadingDeleteCard: true
    });
    const stateAfter = reducer(stateBefore, deleteCardError({
      message: 'message value',
      stackTrace: 'stack trace value'
    }));
    expect(stateAfter.isLoading).toBe(true);
    expect(stateAfter.isLoadingFetchCards).toBe(true);
    expect(stateAfter.isLoadingDeleteCard).toBe(false);
  });

  test('deleteCardError - set error properties', () => {
    const stateBefore = Object.assign({}, initialState, { isLoading: true });
    const stateAfter = reducer(stateBefore, deleteCardError({
      message: 'message value',
      stackTrace: 'stack trace value'
    }));
    expect(stateAfter.errorMessage).toBe('message value');
    expect(stateAfter.errorStackTrace).toBe('stack trace value');
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