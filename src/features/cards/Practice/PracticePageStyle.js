import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  > *:nth-child(2) {
    flex-grow: 1;
  }
`;