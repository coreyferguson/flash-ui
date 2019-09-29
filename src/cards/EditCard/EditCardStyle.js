
import _ from 'styled-components';

export default function styled(component) {
  return _(component)`
    > .sides {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      > .side {
        flex-grow: 1;
        padding: 10px;
        min-width: 350px;
      }
    }

    > .labels {
      display: flex;
      flex-flow: row nowrap;
      margin-top: 20px;
      align-items: baseline;
      > span {
        margin-right: 10px;
      }
      > input {
        flex-grow: 1;
      }
    }

    > .save {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
    }
  `;
}
