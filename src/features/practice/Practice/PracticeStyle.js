
import _ from 'styled-components';

export default function styled(component) {
  return _(component)`
    flex-grow: 1;
    display: flex;

    @media screen and (min-width: 800px) {
      flex-flow: row nowrap;
    }
    @media screen and (max-width: 799px) {
      flex-flow: column nowrap;
    }

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
        width: 100%;
        text-align: center;
      }

      button {
        width: 100%;
        margin: 5px 0 5px 0;
        min-height: 50px;
      }
    }
  `;
}
