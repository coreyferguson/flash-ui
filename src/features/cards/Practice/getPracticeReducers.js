export default function getPracticeReducers(isAnyLoading) {
  return {
    fetchPracticeCards: state => {
      state.isLoading = true;
      state.isLoadingFetchPracticeCards = true;
    },
    fetchPracticeCardsError: (state, action) => {
      state.isLoadingFetchPracticeCards = false;
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
    remindMe: (state, action) => {
      const { frequency } = action.payload;
      const cardId = state.cardsOrderByLastTestTime[0];
      state.activeSides[cardId] = 'A';
      if (frequency === 'immediately') {
        state.cardsOrderByLastTestTime = [
          ...state.cardsOrderByLastTestTime.slice(1),
          cardId
        ];
      } else {
        state.cardsOrderByLastTestTime = state.cardsOrderByLastTestTime.slice(1)
      }
    },
    remindMeError: (state, action) => {
      const { cardId } = action.payload;
      state.cardsOrderByLastTestTime = [
        cardId,
        ...state.cardsOrderByLastTestTime.filter(id => cardId !== id)
      ]
    },

    remindMeQueueStart: state => {
      state.isLoadingRemindMeQueue = true;
    },
    remindMeQueueEnd: state => {
      state.isLoadingRemindMeQueue = false;
    }
  }
}