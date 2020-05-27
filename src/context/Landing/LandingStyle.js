import styled from 'styled-components';

export default styled.div`
    height: 100%;
    display: flex;

    && {
        .button {
            @media(max-width: 799px) {
                font-size: 1.5em;
            }
        }
    }
`;