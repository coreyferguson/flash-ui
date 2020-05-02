import styled from 'styled-components';

export default styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media(max-width: 799px) {
    flex-flow: column nowrap;
  }

  @media(min-width: 800px) {
    flex-flow: row nowrap;
  }

  > .card-container {
    flex-grow: 1;
    display: inline-block;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    max-width: 100%;
  }

  > .controls {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    @media(max-width: 799px) {
      width: 100%;
    }

    .control {
      margin-top: 5px;
      border-sizing: border-box;
      @media(max-width: 799px) {
        width: 100%;
      }
      button {
        box-sizing: border-box;
        margin: 0;
        @media(max-width: 799px) {
          width: 100%;
          height: 50px;
          font-size: 150%;
          text-align: center;
          justify-content: center;
        }
        @media(min-width: 800px) {
          width: 200px;
        }
        margin-bottom: 0px;
      }
    }

  }
`;