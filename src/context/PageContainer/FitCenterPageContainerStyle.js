import styled from 'styled-components';

export default styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 60px auto;
  justify-items: center;

  > nav {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  > .content {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    text-align: center;
  }
`;