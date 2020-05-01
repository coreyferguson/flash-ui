import styled from 'styled-components';

export default styled.div`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    > * {
        flex-grow: 1;
    }
    > *:first-child {
        flex-grow: 0;
    }
`;