import { call, put, race, select, takeLeading, take } from 'redux-saga/effects';
import { actions } from './cardsSlice';
import client from '../../context/apolloProvider/apolloClient';
import GQL_LIST_CARDS from './CardList/GQL_LIST_CARDS';
import GQL_GET_CARD from './CardList/GQL_GET_CARD';
import mediaService from '../media/mediaService';

export function* fetchCardSaga(props) {
  const variables = props && props.payload && props.payload.variables
    ? props.payload.variables
    : undefined;
  // wait for "fetchCards" to complete if that's already running
  if (yield select(state => state.isLoadingFetchCards)) {
    yield race({ error: take(actions.fetchCardsError.type), response: take(actions.fetchCardsResponse.type) });
  }
  try {
    const res = yield call(client.query, { query: GQL_GET_CARD, variables });
    yield put(actions.fetchCardResponse(res));
  } catch (err) {
    yield put(actions.fetchCardError(err));
  }
}

export function* fetchCardsSaga(props) {
  const variables = props && props.payload && props.payload.variables
    ? props.payload.variables
    : undefined;
  // wait for "fetchCard" to complete if that's already running
  if (yield select(state => state.isLoadingFetchCard)) {
    yield race({ error: take(actions.fetchCardError.type), response: take(actions.fetchCardResponse.type) });
  }
  try {
    const res = yield call(client.query, { query: GQL_LIST_CARDS, variables });
    yield put(actions.fetchCardsResponse(res));
  } catch (err) {
    yield put(actions.fetchCardsError(err))
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

export default function* watchCardsSaga() {
  yield takeLeading([ actions.fetchCard.type ], fetchCardSaga);
  yield takeLeading([ actions.fetchCards.type ], fetchCardsSaga);
  yield takeLeading([ actions.fetchImage.type ], fetchImageSaga);
}