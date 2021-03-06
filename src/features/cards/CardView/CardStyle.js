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
      max-height: 245px;
      text-align: center;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      table {
        width: 100%;
      }
      p {
        margin: 0;
        margin-top: 5px;
      }
      ul, ol {
        margin: 0;
        padding-left: 20px;
      }
      ol, ul, code, pre {
        text-align: left;
      }
      hr {
        width: 100%;
      }
      blockquote, pre {
        text-align: left;
        border-left: 1px solid ${colors["background-2-border-color"]};
        background-color: ${colors["background-1"]};
        padding: 5px 10px 5px 10px;
        box-sizing: border-box;
        margin-top: 5px;
        p {
          margin-top: 0;
        }
      }
      pre {
        max-width: 100%;
        overflow: auto;
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

    button {
      background-color: ${colors["background-2"]};
      margin: 0;
    }

    button:hover, button:focus {
      background-color: ${colors["foreground-1"]};
      color: ${colors["background-1"]};
    }
  }
`;
