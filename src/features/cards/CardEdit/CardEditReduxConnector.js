import { connect } from 'react-redux';
import { actions } from '../cardsSlice';

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;
  return {
    id,
    isFetchNeeded: !!id && !state.cardMap[id],
    card: state.cardMap[id],
    cardImages: state.images[id]
  };
};

const mapDispatchToProps = dispatch => ({
  onDelete: ({ id, userId }) => {
    dispatch(actions.deleteCard({ variables: { id, userId } }));
  },
  onFetch: id => {
    dispatch(actions.fetchCard({ variables: { id } }));
  },
  onFetchImage: (id, side, imageUrl) => {
    dispatch(actions.fetchImage({ id, side, imageUrl }))
  },
  onSave: ({ card, cardImages }) => {
    dispatch(actions.saveCard({ card, cardImages }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps);