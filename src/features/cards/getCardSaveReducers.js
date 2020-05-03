export default function getPracticeReducers(isAnyLoading) {
  return {
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
      state.cardsOrderByLastTestTime = state.cardsOrderByLastTestTime.filter(cardId => cardId !== action.payload);
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
  };
}