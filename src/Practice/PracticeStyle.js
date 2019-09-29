
import _ from 'styled-components';

export default function styled(component) {
  return _(component)`
    flex-grow: 1;
    display: flex;
    flex-flow: row nowrap;

    > .card {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    > .controls {
      display: flex;
      flex-flow: column nowrap;
      align-items: stretch;
      justify-content: center;

      > span {
        text-align: center;
      }

      > span:not(:first-child) {
        margin-top: 20px;
      }

      > button {
        margin: 0 0 5px 0;
      }
    }
  `;
}
