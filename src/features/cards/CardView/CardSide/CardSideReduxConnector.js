import { connect } from 'react-redux';
import { actions } from '../../cardsSlice';

const mapStateToProps = (state, ownProps) => {
  const { id, side } = ownProps;
  return {
    id,
    imageSource: state.images && state.images[id] && state.images[id][side] && state.images[id][side].source,
    imageUrl: state.items[id][`side${side}ImageUrl`],
    isImageLoading: state.images && state.images[id] && state.images[id][side] && state.images[id][side].isLoading,
    side,
    text: state.items[id][`side${side}Text`]
  };
};

const mapDispatchToProps = dispatch => ({
  onFetchImage: (id, side, imageUrl) => {
    dispatch(actions.fetchImage({ id, side, imageUrl }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps);