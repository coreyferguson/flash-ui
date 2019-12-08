import { connect } from 'react-redux';
import { actions } from '../cardsSlice';

export const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;
  return {
    activeSide: !state.activeSides || !state.activeSides[id] ? 'A' : state.activeSides[id],
    item: state.items[id]
  };
};

export const mapDispatchToProps = dispatch => ({
  onFlipCard: id => {
    dispatch(actions.flipCard(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps);