import { connect } from 'react-redux';
import { fetchCard, saveCard } from '../cardsSlice';

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;
  return {
    id,
    isFetchNeeded: !state.cardMap[id],
    card: state.cardMap[id]
  };
};

const mapDispatchToProps = dispatch => ({
  onFetch: id => {
    dispatch(fetchCard({ variables: { id } }));
  },
  onSave: card => {
    dispatch(saveCard({ variables: card }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps);