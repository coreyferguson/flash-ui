import { call, put, select, takeEvery, takeLeading, take, actionChannel } from 'redux-saga/effects';
import { actions } from './cardsSlice';
import client from '../../context/apolloProvider/apolloClient';
import GQL_LIST_CARDS from './CardList/GQL_LIST_CARDS';
import GQL_GET_CARD from './CardList/GQL_GET_CARD';
import GQL_SAVE_CARD from './CardList/GQL_SAVE_CARD';
import GQL_DELETE_CARD from './CardList/GQL_DELETE_CARD';
import GQL_FETCH_PRACTICE_CARDS from './Practice/GQL_FETCH_PRACTICE_CARDS'
import GQL_CREATE_PRACTICE_CARDS from './Practice/GQL_CREATE_PRACTICE_CARDS';
import mediaService from '../media/mediaService';
import sessionService from '../../context/authentication/sessionService';
import takeQueue from '../../context/saga-effects/takeQueue';

export default function* watchCardsSaga() {
  yield takeEvery([ actions.deleteCard.type ], deleteCardSaga);
  yield takeEvery([ actions.fetchCard.type ], fetchCardSaga);
  yield takeLeading([ actions.fetchCards.type ], fetchCardsSaga);
  yield takeLeading([ actions.fetchPracticeCards.type ], fetchPracticeCardsSaga);
  yield takeEvery([ actions.fetchImage.type ], fetchImageSaga);
  yield takeEvery([ actions.saveCard.type ], saveCardSaga);
  yield watchRemindMeSaga();
}

export function* deleteCardSaga(props) {
  const variables = props && props.payload && props.payload.variables
    ? props.payload.variables
    : undefined;
  const cardId = props.payload.variables.id;
  try {
    yield call(client.mutate, { mutation: GQL_DELETE_CARD, variables });
    yield put(actions.deleteCardResponse(cardId));
  } catch (err) {
    yield put(actions.deleteCardError({ cardId, message: err.toString(), stackTrace: err.stack }));
  }
}

export function* waitForDeleteCardSaga() {
  if (yield select(state => state.isLoadingDeleteCard)) {
    yield take([ actions.deleteCardError.type, actions.deleteCardResponse.type ]);
  }
}

export function* fetchCardSaga(props) {
  const variables = props && props.payload && props.payload.variables
    ? props.payload.variables
    : undefined;
  yield waitForFetchCardsSaga();
  try {
    const res = yield call(client.query, { query: GQL_GET_CARD, variables });
    yield put(actions.fetchCardResponse(res));
  } catch (err) {
    yield put(actions.fetchCardError(err));
  }
}

export function* waitForFetchCardSaga() {
  if (yield select(state => state.isLoadingFetchCard)) {
    yield take([ actions.fetchCardError.type, actions.fetchCardResponse.type ]);
  }
}

export function* fetchCardsSaga(props) {
  const variables = props && props.payload && props.payload.variables
    ? props.payload.variables
    : undefined;
  yield waitForFetchCardSaga();
  yield waitForDeleteCardSaga();
  yield waitForSaveCardSaga();
  try {
    const res = yield call(client.query, { query: GQL_LIST_CARDS, variables, fetchPolicy: 'network-only' });
    yield put(actions.fetchCardsResponse(res));
  } catch (err) {
    yield put(actions.fetchCardsError(err))
  }
}

export function* waitForFetchCardsSaga() {
  if (yield select(state => state.isLoadingFetchCards)) {
    yield take([ actions.fetchCardsError.type, actions.fetchCardsResponse.type ]);
  }
}

export function* fetchPracticeCardsSaga(props = {}) {
  yield waitForSaveCardSaga();
  props.userId = props.userId || sessionService.getSignInUserSession().idToken.payload.sub;
  try {
    let res = yield call(client.query, { query: GQL_FETCH_PRACTICE_CARDS, fetchPolicy: 'network-only' });
    if (res.data.me.cards.items.length > 0) {
      yield put(actions.fetchPracticeCardsResponse(res.data.me.cards));
    } else {
      res = yield call(client.mutate, { mutation: GQL_CREATE_PRACTICE_CARDS, variables: { userId: props.userId } });
      if (res.data.newPracticeDeck.items.length > 0) {
        yield put(actions.fetchPracticeCardsResponse(res.data.newPracticeDeck));
      } else {
        yield put(actions.fetchPracticeCardsCreationNotPossible());
      }
    }
  } catch (err) {
    console.error('err :>> ', err);
    yield put(actions.fetchPracticeCardsError(err));
  }
}

export function* fetchImageSaga(props) {
  props = props || {};
  props.payload = props.payload || {};
  const { id, side, imageUrl } = props.payload;
  try {
    const source = yield call([mediaService, mediaService.getUrl], imageUrl);
    yield put(actions.fetchImageResponse({ id, side, source }));
  } catch (err) {
    yield put(actions.fetchImageError(err));
  }
}

export function* saveCardSaga(props) {
  const { card, cardImages } = props && props.payload;
  card.userId = card.userId || sessionService.getSignInUserSession().idToken.payload.sub;
  const existingCard = yield select(state => state.cardMap[card.id]);
  try {
    if (cardImages && cardImages[0]) card.sideAImageUrl = yield call([mediaService, mediaService.upload], cardImages[0]);
    if (cardImages && cardImages[1]) card.sideBImageUrl = yield call([mediaService, mediaService.upload], cardImages[1]);
    const res = yield call(client.mutate, { mutation: GQL_SAVE_CARD, variables: { ...existingCard, ...card } });
    yield put(actions.saveCardResponse(res.data.upsertCard));
  } catch (err) {
    yield put(actions.saveCardError({ message: err.toString(), stackTrace: err.stack }));
  }
}

export function* waitForSaveCardSaga() {
  if (yield select(state => state.isLoadingSaveCard)) {
    yield take([ actions.saveCardError.type, actions.saveCardResponse.type ]);
  }
}

export function* watchRemindMeSaga() {
  yield takeQueue({
    actionType: actions.remindMe.type,
    actionSaga: remindMeSaga,
    errorSaga: remindMeSagaError,
    startQueue: function*() { yield put(actions.remindMeQueueStart()) },
    endQueue: function*() { yield put(actions.remindMeQueueEnd()) },
  });
}

export function* remindMeSaga({ payload }) {
  const { cardId, frequency } = payload;
  try {
    const userId = sessionService.getSignInUserSession().idToken.payload.sub;
    const existingCard = yield select(state => state.cardMap[cardId]);
    const lastTestTime = new Date().toISOString();
    if (frequency === 'immediately') {
      const res = yield call(client.mutate, { mutation: GQL_SAVE_CARD, variables: { ...existingCard, userId, lastTestTime } });
      yield put(actions.saveCardResponse(res.data.upsertCard));
    } else {
      const labels = existingCard.labels.filter(label =>
        label!=='frequency-sometimes' &&
        label!=='frequency-often' &&
        label!=='frequency-rarely' &&
        label!=='practice');
      if (frequency !== 'never') labels.push(`frequency-${frequency}`);
      const res = yield call(client.mutate, { mutation: GQL_SAVE_CARD, variables: { ...existingCard, labels, userId, lastTestTime } });
      yield put(actions.saveCardResponse(res.data.upsertCard));
    }
  } catch (err) {
    return { cardId, frequency };
  }
}

export function* remindMeSagaError({ action, error }) {
  const { cardId, frequency } = action.payload;
  yield put(actions.remindMeError({ cardId, frequency, error }));
}