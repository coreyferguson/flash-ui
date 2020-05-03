import { createSlice } from '@reduxjs/toolkit';
import getPracticeReducers from './Practice/getPracticeReducers';
import getCardListReducers from './getCardListReducers';
import imageReducers from './imageReducers';
import getCardSaveReducers from './getCardSaveReducers';

export const initialState = {
  activeSides: {}, // Map<id, ('A' || 'B')>
  error: undefined,
  isFetchCardsAlreadyCompletedOnce: false,
  isLoading: false,
  isLoadingFetchCard: false,
  isLoadingFetchCards: false,
  isLoadingSaveCard: false,
  isLoadingFetchPracticeCards: false,
  isCreationOfPracticeCardsPossible: true,
  images: {}, // Map<id, { (A && B): { isLoading, source } }>
  cardsOrderByCreationDate: [], // List<id>
  cardsOrderByLastTestTime: [], // List<id>
  cardMap: {} // Map<id, card>
};

const isAnyLoading = state => !!(
  state.isLoadingFetchCard ||
  state.isLoadingFetchCards ||
  state.isLoadingSaveCard ||
  state.isLoadingFetchPracticeCards ||
  state.isLoadingRemindMe
);

const slice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    ...getPracticeReducers(isAnyLoading),
    ...getCardListReducers(isAnyLoading),
    ...getCardSaveReducers(isAnyLoading),
    ...imageReducers,
  }
});

export default slice;
export const { actions, reducer } = slice;
