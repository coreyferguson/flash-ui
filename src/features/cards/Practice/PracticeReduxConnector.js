import { connect } from 'react-redux';
import { actions } from '../cardsSlice';

export const mapStateToProps = state => {
  const cardId =
    (state.cardsOrderByLastTestTime && state.cardsOrderByLastTestTime.length > 0)
    ? state.cardsOrderByLastTestTime[0]
    : undefined;
  return {
    isLoadingRemindMeQueue: state.isLoadingRemindMeQueue,
    isLoadingFetchPracticeCards: state.isLoadingFetchPracticeCards,
    isCreationOfPracticeCardsPossible: state.isCreationOfPracticeCardsPossible,
    cardId
  };
};

export const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(actions.fetchPracticeCards());
  },
  onRemindImmediately: cardId => {
    dispatch(actions.remindMe({ cardId, frequency: 'immediately' }));
  },
  onRemindOften: cardId => {
    dispatch(actions.remindMe({ cardId, frequency: 'often' }));
  },
  onRemindSometimes: cardId => {
    dispatch(actions.remindMe({ cardId, frequency: 'sometimes' }));
  },
  onRemindRarely: cardId => {
    dispatch(actions.remindMe({ cardId, frequency: 'rarely' }));
  },
  onRemindNever: cardId => {
    dispatch(actions.remindMe({ cardId, frequency: 'never' }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps);