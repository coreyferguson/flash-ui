import { initialState, reducer, actions } from './cardsSlice';

describe('card list reducers', () => {
  describe('saveCard', () => {
    test('saveCard - set loading to true', () => {
      const stateBefore = Object.assign({}, initialState);
      const stateAfter = reducer(stateBefore, actions.saveCard());
      expect(stateAfter.isLoading).toBe(true);
      expect(stateAfter.isLoadingSaveCard).toBe(true);
    });

    test('saveCardResponse - set loading to false', () => {
      const stateBefore = Object.assign({}, initialState, { isLoading: true, isLoadingSaveCard: true });
      const stateAfter = reducer(stateBefore, actions.saveCardResponse({ id: '1' }));
      expect(stateAfter.isLoading).toBe(false);
      expect(stateAfter.isLoadingSaveCard).toBe(false);
    });

    test('saveCardResponse - continue loading if other actions still in-progress', () => {
      const stateBefore = Object.assign({}, initialState, {
        isLoading: true,
        isLoadingSaveCard: true,
        isLoadingFetchCard: true
      });
      const stateAfter = reducer(stateBefore, actions.saveCardResponse({ id: '1' }));
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
      const stateAfter = reducer(stateBefore, actions.saveCardResponse({ id: '2' }));
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
      const stateAfter = reducer(stateBefore, actions.saveCardResponse({ id: '1', sideAText: 'sideAText updated value' }));
      expect(stateAfter.cardsOrderByCreationDate).toEqual(['1']);
      expect(stateAfter.cardMap['1']).toEqual({ id: '1', sideAText: 'sideAText updated value' });
    });

    test('saveCardResponse - delete image from existing card', () => {
      const stateBefore = Object.assign({}, initialState, {
        cardMap: { '1': { id: '1', sideAText: 'sideAText value', sideAImageUrl: 'sideAImageUrl value', sideBImageUrl: 'sideBImageUrl value' } },
        images: { '1': { A: { source: 'side A source value' }, B: { source: 'side B source value' } } }
      });
      const stateAfter = reducer(stateBefore, actions.saveCardResponse({ id: '1', sideAText: 'sideAText value' }));
      expect(stateAfter.images['1'].A.source).toBeUndefined();
      expect(stateAfter.images['1'].B.source).toBeUndefined();
    });

    test('saveCardError - set loading to false', () => {
      const stateBefore = Object.assign({}, initialState, { isLoading: true, isLoadingSaveCard: true });
      const stateAfter = reducer(stateBefore, actions.saveCardError({
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
      const stateAfter = reducer(stateBefore, actions.saveCardError({
        message: 'message value',
        stackTrace: 'stack trace value'
      }));
      expect(stateAfter.isLoading).toBe(true);
      expect(stateAfter.isLoadingFetchCards).toBe(true);
      expect(stateAfter.isLoadingSaveCard).toBe(false);
    });

    test('saveCardError - set error properties', () => {
      const stateBefore = Object.assign({}, initialState, { isLoading: true });
      const stateAfter = reducer(stateBefore, actions.saveCardError({
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
      const stateAfter = reducer(stateBefore, actions.deleteCard());
      expect(stateAfter.isLoading).toBe(true);
      expect(stateAfter.isLoadingDeleteCard).toBe(true);
    });

    test('deleteCard - set loading to false', () => {
      const stateBefore = Object.assign({}, initialState, { isLoading: true, isLoadingDeleteCard: true });
      const stateAfter = reducer(stateBefore, actions.deleteCardResponse('1'));
      expect(stateAfter.isLoading).toBe(false);
      expect(stateAfter.isLoadingDeleteCard).toBe(false);
    });

    test('deleteCardResponse - continue loading if other actions still in-progress', () => {
      const stateBefore = Object.assign({}, initialState, {
        isLoading: true,
        isLoadingDeleteCard: true,
        isLoadingFetchCard: true
      });
      const stateAfter = reducer(stateBefore, actions.deleteCardResponse('1'));
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
      const stateAfter = reducer(stateBefore, actions.deleteCardResponse('2'));
      expect(stateAfter.cardsOrderByCreationDate).toEqual(['1']);
      expect(stateAfter.cardMap['1']).toEqual({ id: '1' });
      expect(stateAfter.cardMap['2']).toBeUndefined();
    });

    test('deleteCardError - set loading to false', () => {
      const stateBefore = Object.assign({}, initialState, { isLoading: true, isLoadingDeleteCard: true });
      const stateAfter = reducer(stateBefore, actions.deleteCardError({
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
      const stateAfter = reducer(stateBefore, actions.deleteCardError({
        message: 'message value',
        stackTrace: 'stack trace value'
      }));
      expect(stateAfter.isLoading).toBe(true);
      expect(stateAfter.isLoadingFetchCards).toBe(true);
      expect(stateAfter.isLoadingDeleteCard).toBe(false);
    });

    test('deleteCardError - set error properties', () => {
      const stateBefore = Object.assign({}, initialState, { isLoading: true });
      const stateAfter = reducer(stateBefore, actions.deleteCardError({
        message: 'message value',
        stackTrace: 'stack trace value'
      }));
      expect(stateAfter.errorMessage).toBe('message value');
      expect(stateAfter.errorStackTrace).toBe('stack trace value');
    });
  });
});