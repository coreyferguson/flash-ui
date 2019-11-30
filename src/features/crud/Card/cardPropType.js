
import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  sideAText: PropTypes.string,
  sideAImageUrl: PropTypes.string,
  sideBText: PropTypes.string,
  sideBImageUrl: PropTypes.string
});
