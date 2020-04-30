import styled from 'styled-components';
import sizes from '../../../context/styles/sizes';

export default styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  > *:nth-child(2) {
    flex-grow: 1;
    @media (max-width: 799px) {
      padding: ${sizes["page-padding-small"]}
    }
    @media (min-width: 800px) {
      padding: ${sizes["page-padding-large"]}
    }
  }
`;