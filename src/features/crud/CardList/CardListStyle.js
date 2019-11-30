
import _ from 'styled-components';

export default function styled(component) {
  return _(component)`
    > .actions {
      display: flex;
      justify-content: center;
      > .button {
        margin: 0px;
        margin-bottom: 5px;
      }
    }

    > .list {
      display: flex;
      flex-flow: row wrap;
      @media screen and (min-width: 800px) {
        padding: 10px;
      }
      justify-content: center;
    }
  `;
}
