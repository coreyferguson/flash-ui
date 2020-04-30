import { createSlice } from '@reduxjs/toolkit';

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
    fetchCard: state => {
      state.isLoading = true;
      state.isLoadingFetchCard = true;
    },
    fetchCardError: (state, action) => {
      state.isLoadingFetchCard = false;
      state.isLoading = isAnyLoading(state);
      state.error = action.payload;
    },
    fetchCardResponse: (state, action) => {
      const id = action.payload.data.me.card.id;
      const images = Object.assign({}, state.images, {
        [id]: Object.assign({}, state.images[id], {
          A: !state.images[id] ? { isLoading: false } : state.images[id].A,
          B: !state.images[id] ? { isLoading: false } : state.images[id].B
        })
      });
      return Object.assign({}, state, {
        isLoading: isAnyLoading(state),
        isLoadingFetchCard: false,
        images,
        cardMap: Object.assign({}, state.cardMap, { [id]: action.payload.data.me.card })
      });
    },

    fetchCards: state => {
      state.isLoading = true;
      state.isLoadingFetchCards = true;
    },
    fetchCardsError: (state, action) => {
      state.isLoadingFetchCards = false;
      state.isLoading = isAnyLoading(state);
      state.error = action.payload;
    },
    fetchCardsResponse: (state, action) => {
      const newItemIdSet = new Set();
      const newCardMap = action.payload.data.me.cards.items.reduce((agg, item) => {
        agg[item.id] = item;
        newItemIdSet.add(item.id);
        return agg;
      }, {});
      const newCardsOrderByCreationDate = [...state.cardsOrderByCreationDate];
      for (let itemId of state.cardsOrderByCreationDate) newItemIdSet.delete(itemId);
      for (let itemId of newItemIdSet) newCardsOrderByCreationDate.push(itemId);
      return Object.assign({}, state, {
        isFetchCardsAlreadyCompletedOnce: true,
        isLoadingFetchCards: false,
        isLoading: isAnyLoading({ ...state, isLoadingFetchCards: false }),
        cardsOrderByCreationDate: newCardsOrderByCreationDate,
        cardMap: Object.assign({}, state.cardMap, newCardMap),
        fetchCardsNextCursor: action.payload.data.me.cards.next,
      });
    },

    fetchPracticeCards: state => {
      state.isLoading = true;
      state.isLoadingFetchPracticeCards = true;
    },
    fetchPracticeCardsError: (state, action) => {
      state.isLoadingFetchCards = false;
      state.isLoading = isAnyLoading(state);
      console.error(action.payload); // TODO: Handle errors
    },
    fetchPracticeCardsResponse: (state, action) => {
      const cardsOrderByLastTestTime = [];
      const newCardMap = action.payload.items.reduce((agg, item) => {
        agg[item.id] = item;
        cardsOrderByLastTestTime.push(item.id);
        return agg;
      }, {});
      return Object.assign({}, state, {
        isCreationOfPracticeCardsPossible: true,
        isLoadingFetchPracticeCards: false,
        isLoading: isAnyLoading({ ...state, isLoadingFetchPracticeCards: false }),
        cardsOrderByLastTestTime,
        cardMap: Object.assign({}, state.cardMap, newCardMap)
      });
    },
    fetchPracticeCardsCreationNotPossible: state => {
      state.isCreationOfPracticeCardsPossible = false;
      state.isLoadingFetchPracticeCards = false;
      state.isLoading = isAnyLoading(state);
    },

    fetchImage: (state, action) => {
      const { id, side } = action.payload;
      return Object.assign({}, state, {
        images: Object.assign({}, state.images, {
          [id]: !state.images[id]
            ? Object.assign({ A: { isLoading: false }, B: { isLoading: false } }, { [side]: { isLoading: true } })
            : Object.assign({}, state.images[id], {
              [side]: Object.assign({}, state.images[id][side], { isLoading: true })
            })
        })
      });
    },
    fetchImageResponse: (state, action) => {
      const { id, side, source } = action.payload;
      const updatedSide = { isLoading: false, source };
      return Object.assign({}, state, {
        images: Object.assign({}, state.images, {
          [id]: Object.assign({}, state.images[id], {
            [side]: !state.images[id]
              ? Object.assign({ A: { isLoading: false }, B: { isLoading: false } }, updatedSide)
              : Object.assign({}, state.images[id][side], updatedSide)
          })
        })
      });
    },
    fetchImageError: (state, action) => {
      const { id, side, error } = action.payload;
      const updatedSide = { [side]: { isLoading: false, error } };
      state.images = Object.assign({}, state.images, {
        [id]: !state.images[id]
          ? Object.assign({ A: {}, B: {} }, updatedSide)
          : Object.assign({}, state.images[id], updatedSide)
      });
    },

    flipCard: (state, action) => {
      const activeSide = state.activeSides[action.payload];
      return Object.assign({}, state, {
        activeSides: Object.assign({}, state.activeSides, {
          [action.payload]: !activeSide || activeSide === 'A' ? 'B' : 'A'
        })
      });
    },

    saveCard: (state, action) => {
      state.isLoading = true;
      state.isLoadingSaveCard = true;
    },
    /**
     * @param {Object} action.payload updated card data
     */
    saveCardResponse: (state, action) => {
      state.isLoadingSaveCard = false;
      state.isLoading = isAnyLoading(state);
      const existingCard = state.cardMap[action.payload.id];
      if (!existingCard) state.cardsOrderByCreationDate = [ action.payload.id, ...state.cardsOrderByCreationDate ];
      else {
        if (existingCard.sideAImageUrl !== action.payload.sideAImageUrl && state.images[action.payload.id]) {
         state.images[action.payload.id].A.source = undefined;
        }
        if (existingCard.sideBImageUrl !== action.payload.sideBImageUrl && state.images[action.payload.id]) {
          state.images[action.payload.id].B.source = undefined;
        }
      }
      state.cardMap[action.payload.id] = action.payload;
    },
    saveCardError: (state, action) => {
      state.isLoadingSaveCard = false;
      state.isLoading = isAnyLoading(state);
      state.errorMessage = action.payload.message;
      state.errorStackTrace = action.payload.stackTrace;
    },

    /**
     * @param {String} action.payload card id
     */
    deleteCard: (state, action) => {
      state.isLoading = true;
      state.isLoadingDeleteCard = true;
    },
    /**
     * @param {String} action.payload card id
     */
    deleteCardResponse: (state, action) => {
      state.isLoadingDeleteCard = false;
      state.isLoading = isAnyLoading(state);
      delete state.cardMap[action.payload];
      state.cardsOrderByCreationDate = state.cardsOrderByCreationDate.filter(cardId => cardId !== action.payload);
    },
    /**
     * @param {String} action.payload card id
     */
    deleteCardError: (state, action) => {
      state.isLoadingDeleteCard = false;
      state.isLoading = isAnyLoading(state);
      state.errorMessage = action.payload.message;
      state.errorStackTrace = action.payload.stackTrace;
    },

    remindMe: state => {
      state.isLoading = true;
      state.isLoadingRemindMe = true;
    },
    remindMeResponse: (state, action) => {
      const { cardId, frequency } = action.payload;
      if (frequency === 'immediately') {
        state.cardsOrderByLastTestTime = [
          ...state.cardsOrderByLastTestTime.slice(1),
          state.cardsOrderByLastTestTime[0]
        ];
      } else {
        state.cardsOrderByLastTestTime = state.cardsOrderByLastTestTime.slice(1)
      }
      state.isLoadingRemindMe = false;
      state.isLoading = isAnyLoading(state);
    },
    remindMeError: (state, action) => {
    },
  }
});

export default slice;
export const { actions, reducer } = slice;
export const {
  deleteCard, deleteCardError, deleteCardResponse,
  fetchCard, fetchCardError, fetchCardResponse,
  fetchCards, fetchCardsError, fetchCardsResponse,
  fetchPracticeCards, fetchPracticeCardsError, fetchPracticeCardsResponse, fetchPracticeCardsCreationNotPossible,
  fetchImage, fetchImageError, fetchImageResponse,
  flipCard,
  saveCard, saveCardError, saveCardResponse,
  remindMe, remindMeResponse, remindMeError,
} = slice.actions;