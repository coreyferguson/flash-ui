import styled from 'styled-components';

export default styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  > .card-container {
    flex-grow: 1;
    display: inline-block;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }

  > .controls {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    .control {
      button {
        width: 200px;
        margin-bottom: 0px;
      }
    }

  }
`;