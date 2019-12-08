import styled from 'styled-components';
import colors from '../../../context/styles/colors';
import shapes from '../../../context/styles/shapes';

export const Menu = styled.menu`
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;

  button, > span > button {
    margin: 0;
    margin-bottom: 10px;
  }
`;

export default styled.section`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;

  > * {
    flex-grow: 1;
  }
`;

export const ListStyle = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0;
  justify-content: center;
  box-sizing: border-box;
  flex-grow: 1;

  > li {
    box-sizing: border-box;
    max-width: 100%;
    position: relative;

    @media screen and (max-width: 799px) {
      padding: 5px;
    }
    @media screen and (min-width: 800px) {
      padding: 10px;
    }
  }

  figure.contained {
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
  }

  div.card {
    background-color: ${colors['background-2']};
    border: 1px solid ${colors['background-2-border-color']};
    border-radius: ${shapes['border-radius']};
    width: 500px;
    max-width: 100%;
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
  }
`;
