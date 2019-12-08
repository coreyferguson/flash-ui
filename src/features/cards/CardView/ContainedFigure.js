import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContainedFigure = styled.figure`
  object-fit: contain;
  background: url(${props => props.src}) center/contain no-repeat;
  background-size: contain;
  margin: 0;
  padding: 0;
`;

ContainedFigure.propTypes = {
  src: PropTypes.string.isRequired
}

export default ContainedFigure;