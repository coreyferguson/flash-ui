import { all } from 'redux-saga/effects';
import cardsSaga from '../features/cards/cardsSaga';

export default function* rootSaga() {
  yield all([ cardsSaga() ]);
}