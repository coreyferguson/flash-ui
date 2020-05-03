import { initialState, reducer, actions } from './cardsSlice';

describe('imageReducers', () => {
  describe('fetchImage', () => {
    test('fetchImage - with existing state', () => {
      const stateBefore = Object.assign({}, initialState, {
        images: { idValue1: { A: { isLoading: false }, B: { isLoading: false } } }
      });
      let stateAfter = reducer(stateBefore, actions.fetchImage({ id: 'idValue1', side: 'A' }));
      expect(stateAfter.images.idValue1.A.isLoading).toBe(true);
      expect(stateAfter.images.idValue1.B.isLoading).toBe(false);
      stateAfter = reducer(stateBefore, actions.fetchImage({ id: 'idValue1', side: 'B' }));
      expect(stateAfter.images.idValue1.A.isLoading).toBe(false);
      expect(stateAfter.images.idValue1.B.isLoading).toBe(true);
    });

    test('fetchImage - without existing state', () => {
      const stateAfter = reducer(initialState, actions.fetchImage({ id: 'idValue2', side: 'A' }));
      expect(stateAfter.images.idValue2.A.isLoading).toBe(true);
      expect(stateAfter.images.idValue2.B.isLoading).toBe(false);
    });

    test('fetchImageError - with existing state', () => {
      const stateBefore = Object.assign({}, initialState, {
        images: { idValue1: { A: { isLoading: true, error: new Error('old error') }, B: { isLoading: false } } }
      });
      const stateAfter = reducer(stateBefore, actions.fetchImageError({ id: 'idValue1', side: 'A', error: new Error('new error') }));
      expect(stateAfter.images.idValue1.A.isLoading).toBe(false);
      expect(stateAfter.images.idValue1.A.error.message).toBe('new error');
    });

    test('fetchImageError - without existing state', () => {
      const stateAfter = reducer(initialState, actions.fetchImageError({ id: 'idValue1', side: 'A', error: new Error('oops') }));
      expect(stateAfter.images.idValue1.A.isLoading).toBe(false);
      expect(stateAfter.images.idValue1.A.error.message).toBe('oops');
    });

    test('fetchImageResponse - with existing state', () => {
      const stateBefore = Object.assign({}, initialState, {
        images: { idValue1: { A: { isLoading: true, source: 'oldImageSourceValue' }, B: {} } }
      });
      const stateAfter = reducer(stateBefore, actions.fetchImageResponse({ id: 'idValue1', side: 'A', source: 'imageSourceValue' }));
      expect(stateAfter.images.idValue1.A.isLoading).toBe(false);
      expect(stateAfter.images.idValue1.A.source).toBe('imageSourceValue');
    });

    test('fetchImageResponse - without existing state', () => {
      const stateAfter = reducer(initialState, actions.fetchImageResponse({ id: 'idValue1', side: 'A', source: 'imageSourceValue' }));
      expect(stateAfter.images.idValue1.A.isLoading).toBe(false);
      expect(stateAfter.images.idValue1.A.source).toBe('imageSourceValue');
    });
  });
});