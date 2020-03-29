import { connect } from 'react-redux';
import { actions } from '../cardsSlice';

export const mapStateToProps = state => {
  return {
    error: state.error,
    isLoading: state.isLoading,
    itemOrder: state.itemOrder,
    items: state.items
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