
import _ from 'styled-components';
import PropTypes from 'prop-types';

export default function styled(component) {
  return _(component)`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;

    > .page-content {
      flex-grow: 1;
      display: flex;
      flex-flow: column nowrap;
      @media (max-width: 799px) {
        padding: 5px;
      }
      @media (min-width: 800px) {
        padding: 20px;
      }
    }
  `;
}
