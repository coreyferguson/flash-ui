
import _ from 'styled-components';
import colors from '../../styles/colors';
import shapes from '../../styles/shapes';

export default function styled(component) {
  return _(component)`
    position: relative;
    background-color: ${colors['background-2']};
    border: 1px solid ${colors['background-2-border-color']};
    border-radius: ${shapes['border-radius']};
    box-sizing: border-box;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 1);
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    cursor: pointer;

    @media screen and (max-width: 799px) {
      margin: 5px;
    }

    @media screen and (min-width: 800px) {
      margin: 10px;
    }

    > .grow {
      flex: 1;
    }

    > .text {
      width: 100%;
      text-align: center;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    }

    > .image {
      width: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position-x: center;
      background-position-y: center;
    }

    > .loading {
      display: flex;
      align-items: center;
      font-size: 50%;
    }

    > .actions {
      position: absolute;
      bottom: 0;
      right: 0;
      margin-right: 10px;
      margin-bottom: 10px;
    }

    > .actions > .action {
      text-shadow: 3px 3px 2px rgba(0, 0, 0, 1);
      cursor: pointer;
      user-select: none;
      margin: 0px 0px 0px 5px;
      color: ${colors['foreground-1']}
      font-size: 30px;
      > i {
        font-size: 30px;
      }
    }
  `;
}
