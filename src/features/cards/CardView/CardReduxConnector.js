import { connect } from 'react-redux';
import { actions } from '../cardsSlice';

export const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;
  return {
    activeSide: state.activeSides && state.activeSides[id],
    image: state.images[id],
    item: state.items[id]
  };
};

export const mapDispatchToProps = dispatch => ({
  onFlipCard: id => {
    dispatch(actions.flipCard(id));
  },
  onFetchImage: (id, side, imageUrl) => {
    dispatch(actions.fetchImage({ id, side, imageUrl }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps);