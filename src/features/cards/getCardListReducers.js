export default function getPracticeReducers(isAnyLoading) {
  return {
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

    flipCard: (state, action) => {
      const activeSide = state.activeSides[action.payload];
      return Object.assign({}, state, {
        activeSides: Object.assign({}, state.activeSides, {
          [action.payload]: !activeSide || activeSide === 'A' ? 'B' : 'A'
        })
      });
    },
  };
}