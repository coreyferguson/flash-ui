
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

    > .save {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
    }
  `;
}
