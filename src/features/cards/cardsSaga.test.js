import watchFetchCards, { fetchImageSaga, fetchCardSaga, fetchCardsSaga, saveCardSaga } from './cardsSaga';
import { call, put, select, take, takeLeading } from 'redux-saga/effects';
import GQL_GET_CARD from './CardList/GQL_GET_CARD';
import GQL_LIST_CARDS from './CardList/GQL_LIST_CARDS';
import GQL_SAVE_CARD from './CardList/GQL_SAVE_CARD';
import { actions, fetchImageResponse, fetchImageError } from './cardsSlice';
import mediaService from '../media/mediaService';

describe('cardsSaga', () => {

  test('watch saga', () => {
    const gen = watchFetchCards();
    const sagas = [];
    for (let saga of gen) sagas.push(saga);
    expect(sagas).toContainEqual(takeLeading([actions.fetchCard.type], fetchCardSaga));
    expect(sagas).toContainEqual(takeLeading([actions.fetchCards.type], fetchCardsSaga));
    expect(sagas).toContainEqual(takeLeading([actions.saveCard.type], saveCardSaga));
  });

  describe('fetchCardSaga', () => {
    test('waits for fetchCards before starting', () => {
      const gen = fetchCardSaga({ payload: { variables: { id: 'idValue1' } } });
      expect(gen.next().value.type).toBe('SELECT');
      const actual = gen.next(true).value;
      expect(actual.type).toBe('RACE');
      expect(actual.payload.error).toEqual(take(actions.fetchCardsError.type));
      expect(actual.payload.response).toEqual(take(actions.fetchCardsResponse.type));
    });

    test('does not wait for fetchCards before starting', () => {
      const gen = fetchCardSaga({ payload: { variables: { id: 'idValue1' } } });
      expect(gen.next().value.type).toBe('SELECT');
      const actual = gen.next(false).value;
      expect(actual.type).toBe('CALL');
      expect(actual.payload.args[0].query).toBe(GQL_GET_CARD);
      expect(actual.payload.args[0].variables.id).toBe('idValue1');
    });

    test('successful response', () => {
      const gen = fetchCardSaga({ payload: { variables: { id: 'idValue1' } } });
      expect(gen.next().value.type).toBe('SELECT');
      expect(gen.next(false).value.type).toBe('CALL');
      const actual = gen.next('responseValue').value;
      const expected = put(actions.fetchCardResponse('responseValue'));
      expect(actual).toEqual(expected);
    });

    test('error', () => {
      const gen = fetchCardSaga({ payload: { variables: { id: 'idValue1' } } });
      expect(gen.next().value.type).toBe('SELECT');
      expect(gen.next(false).value.type).toBe('CALL');
      const actual = gen.throw(new Error('oops')).value;
      const expected = put(actions.fetchCardError(new Error('oops')));
      expect(actual).toEqual(expected);
    });
  });

  describe('fetchCardsSaga', () => {
    test('waits for fetchCard before starting', () => {
      const gen = fetchCardsSaga();
      expect(gen.next().value.type).toBe('SELECT');
      const actual = gen.next(true).value;
      expect(actual.type).toBe('RACE');
      expect(actual.payload.error).toEqual(take(actions.fetchCardError.type));
      expect(actual.payload.response).toEqual(take(actions.fetchCardResponse.type));
    });

    test('does not wait for fetchCard before starting', () => {
      const gen = fetchCardsSaga();
      expect(gen.next().value.type).toBe('SELECT');
      const actual = gen.next(false).value;
      expect(actual.type).toBe('CALL');
      expect(actual.payload.args[0].query).toBe(GQL_LIST_CARDS);
    });

    test('successful response', () => {
      const gen = fetchCardsSaga();
      expect(gen.next().value.type).toBe('SELECT');
      expect(gen.next(false).value.type).toBe('CALL');
      const actual = gen.next('responseValue').value;
      const expected = put(actions.fetchCardsResponse('responseValue'));
      expect(actual).toEqual(expected);
    });

    test('error', () => {
      const gen = fetchCardsSaga();
      expect(gen.next().value.type).toBe('SELECT');
      expect(gen.next(false).value.type).toBe('CALL');
      const actual = gen.throw(new Error('oops')).value;
      const expected = put(actions.fetchCardsError(new Error('oops')));
      expect(actual).toEqual(expected);
    });
  });

  describe('fetchImageSaga', () => {
    test('successful response', () => {
      const payload = { id: 'idValue1', side: 'A', imageUrl: 'imageUrlValue' };
      const gen = fetchImageSaga({ payload });
      expect(gen.next().value).toEqual(call([mediaService, mediaService.getUrl], 'imageUrlValue'));
      expect(gen.next('sourceValue').value).toEqual(put(fetchImageResponse({ id: 'idValue1', side: 'A', source: 'sourceValue' })));
    });

    test('error response', () => {
      const gen = fetchImageSaga({ payload: { id: 'idValue1', side: 'A', imageUrl: 'imageUrlValue' } });
      expect(gen.next().value).toEqual(call([mediaService, mediaService.getUrl], 'imageUrlValue'));
      expect(gen.throw(new Error('oops')).value).toEqual(put(fetchImageError(new Error('oops'))));
    });
  });

  describe('saveCardSaga', () => {
    test('save card', () => {
      const gen = saveCardSaga({ payload: { variables: { id: 'id value' } } });
      const actual = gen.next().value;
      expect(actual.type).toBe('CALL');
      expect(actual.payload.args[0].mutation).toBe(GQL_SAVE_CARD);
      expect(actual.payload.args[0].variables.id).toBe('id value');
    });

    test('successful response', () => {
      const gen = saveCardSaga({ payload: { variables: { id: 'id value' } } });
      expect(gen.next().value.type).toBe('CALL');
      const actual = gen.next({ data: { upsertCard: 'response value' } }).value;
      const expected = put(actions.saveCardResponse('response value'));
      expect(actual).toEqual(expected);
    });

    test('error', () => {
      const gen = saveCardSaga({ payload: { variables: { id: 'id value' } } });
      expect(gen.next().value.type).toBe('CALL');
      const actual = gen.throw(new Error('oops')).value;
      expect(actual.payload.action.payload.message).toEqual('Error: oops');
      expect(actual.payload.action.payload.stackTrace).not.toBeNull();
    });
  });
});