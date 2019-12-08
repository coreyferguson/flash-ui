import { connect } from 'react-redux';
import { fetchCard } from '../cardsSlice';

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;
  return {
    id,
    isFetchNeeded: !state.items[id],
    item: state.items[id]
  };
};

const mapDispatchToProps = dispatch => ({
  onFetch: id => {
    dispatch(fetchCard({ variables: { id } }));
  },
  onSave: card => {
  }
});

export default connect(mapStateToProps, mapDispatchToProps);