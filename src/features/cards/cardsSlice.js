import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  activeSides: {}, // Map<id, ('A' || 'B')>
  error: undefined,
  isLoading: false,
  isLoadingFetchCard: false,
  isLoadingFetchCards: false,
  isLoadingSaveCard: false,
  images: {}, // Map<id, { (A && B): { isLoading, source } }>
  cardOrder: [], // List<id>
  cardMap: {} // Map<id, card>
};

const isAnyLoading = state => !!(state.isLoadingFetchCard || state.isLoadingFetchCards || state.isLoadingSaveCard);

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
      const cardOrder = state.cardMap[id] ? state.cardOrder : [...state.cardOrder, id];
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
        cardOrder,
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
      const newcardMap = action.payload.data.me.cards.items.reduce((agg, item) => {
        agg[item.id] = item;
        newItemIdSet.add(item.id);
        return agg;
      }, {});
      const newcardOrder = [...state.cardOrder];
      for (let itemId of state.cardOrder) newItemIdSet.delete(itemId);
      for (let itemId of newItemIdSet) newcardOrder.push(itemId);
      return Object.assign({}, state, {
        isLoadingFetchCards: false,
        isLoading: isAnyLoading(state),
        cardOrder: newcardOrder,
        cardMap: Object.assign({}, state.cardMap, newcardMap),
        next: action.payload.data.me.cards.next
      });
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
      if (!existingCard) state.cardOrder = [ ...state.cardOrder, action.payload.id ];
      else state.cardOrder.sort((a, b) => state.cardMap[a].lastTestTime > state.cardMap[b].lastTestTime ? -1 : 1);
      state.cardMap[action.payload.id] = action.payload;
    },
    saveCardError: (state, action) => {
      state.isLoadingSaveCard = false;
      state.isLoading = isAnyLoading(state);
      state.errorMessage = action.payload.message;
      state.errorStackTrace = action.payload.stackTrace;
    }
  }
});

export default slice;
export const { actions, reducer } = slice;
export const {
  fetchCard, fetchCardError, fetchCardResponse,
  fetchCards, fetchCardsError, fetchCardsResponse,
  fetchImage, fetchImageError, fetchImageResponse,
  flipCard,
  saveCard, saveCardError, saveCardResponse,
} = slice.actions;