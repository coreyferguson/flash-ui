import { connect } from 'react-redux';
import { actions } from '../cardsSlice';

export const mapStateToProps = state => {
  return {
    activeSides: state.activeSides,
    error: state.error,
    isLoading: state.isLoading,
    images: state.images,
    itemOrder: state.itemOrder,
    items: state.items,
    next: state.next
  };
};

export const mapDispatchToProps = dispatch => ({
  onFetchImage: (id, side, imageUrl) => {
    dispatch(actions.fetchImage({ id, side, imageUrl }));
  },
  onLoad: () => {
    dispatch(actions.fetchCards());
  },
  onLoadNextPage: next => {
    dispatch(actions.fetchCards({ variables: { next } }))
  },
});

export default connect(mapStateToProps, mapDispatchToProps);