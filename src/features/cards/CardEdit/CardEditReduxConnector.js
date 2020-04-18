import { connect } from 'react-redux';
import {
  deleteCard, fetchCard, saveCard,
  fetchImage
} from '../cardsSlice';

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
    dispatch(deleteCard({ variables: { id, userId } }));
  },
  onFetch: id => {
    dispatch(fetchCard({ variables: { id } }));
  },
  onFetchImage: (id, side, imageUrl) => {
    dispatch(fetchImage({ id, side, imageUrl }))
  },
  onSave: card => {
    dispatch(saveCard({ variables: card }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps);