import styled from 'styled-components';


export default styled.section`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  width: 100%;

  > .load-more {
    text-align: center;
  }
`;

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

    @media screen and (max-width: 799px) {
      padding: 5px;
    }
    @media screen and (min-width: 800px) {
      padding: 10px;
    }
  }
`;
