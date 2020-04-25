import { connect } from 'react-redux';
import { actions } from '../cardsSlice';

export const mapStateToProps = state => {
  return {
    error: state.error,
    isLoading: state.isLoading,
    cardMap: state.cardMap,
    cardsOrderByCreationDate: state.cardsOrderByCreationDate,
    isFetchCardsAlreadyCompletedOnce: state.isFetchCardsAlreadyCompletedOnce,
    next: state.fetchCardsNextCursor,
  };
};

export const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(actions.fetchCards());
  },
  onLoadNextPage: next => {
    dispatch(actions.fetchCards({ variables: { next } }))
  },
});

export default connect(mapStateToProps, mapDispatchToProps);