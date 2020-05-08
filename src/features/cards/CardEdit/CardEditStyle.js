import styled from 'styled-components';

export default styled.div`
  padding: 5px;

  > form {
    > *:not(:first-child) {
      margin-top: 50px;
    }

    > .sides {
      display: flex;
      @media (max-width: 799px) {
        flex-flow: column nowrap;
      }
      @media (min-width: 800px) {
        flex-flow: row nowrap;
        > *:first-child {
          margin-right: 10px;
        }
      }
      > * {
        flex-grow: 1;
        margin-top: 20px;
      }
    }

    > .labels {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      > *:first-child {
        margin-right: 10px;
      }
      > *:last-child {
        flex-grow: 1;
      }
    }

    > .controls {
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      @media (max-width: 799px) {
        flex-flow: column nowrap;
      }
      @media (min-width: 800px) {
        flex-flow: row nowrap;
      }

      > span {
        @media (max-width: 799px) {
          width: 100%;
        }
      }

      > .control {
        margin-bottom: 5px;
        button {
          min-width: 200px;
          @media (max-width: 799px) {
            width: 100%;
            font-size: 1.5em;
            margin: 0;
          }
        }
      }

    }

    textarea {
      box-sizing: border-box;
      width: 100%;
    }

    img {
      height: 100px;
    }
  }
`;