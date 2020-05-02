import styled from 'styled-components';
import colors from '../../../context/styles/colors';
import shapes from '../../../context/styles/shapes';

export default styled.div`
  background-color: ${colors['background-2']};
  border: 1px solid ${colors['background-2-border-color']};
  border-radius: ${shapes['border-radius']};
  width: 500px;
  max-width: 100%;
  box-sizing: border-box;
  height: 300px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 799px) {
    padding: 5px;
  }
  @media screen and (min-width: 800px) {
    padding: 10px;
  }

  div.card-content {
    flex-grow: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;

    > .markdown {
      width: 100%;
      text-align: center;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      table {
        width: 100%;
      }
      ul, p {
        margin: 0;
      }
      ol, ul, code, pre {
        text-align: left;
      }
      hr {
        width: 100%;
      }
    }

    > span * {
      margin: 0;
      padding: 0;
    }

    > figure {
      flex-grow: 1;
      width: 100%;
    }
  }

  menu.card-menu {
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-grow: row nowrap;
    box-sizing: border-box;
    justify-content: flex-end;
    align-items: center;

    > a {
      color: ${colors["foreground-1"]}
    }
  }
`;
