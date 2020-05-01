import styled from 'styled-components';

export default styled.div`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;

    > .landing-view-unauthenticated {
        display: flex;
        flex-grow: 1;

        @media (max-width: 799px) {
            flex-wrap: wrap;
        }

        div {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
        }

        .content {

            flex-direction: column;

            @media (min-width: 1400px) {
            margin-left: 10%;
            }

            // desktop
            @media (min-width: 800px) {
            min-width: 482px;
            }

            // mobile
            @media (max-width: 799px) {
            min-width: 325px;
            margin-top: 0;
            margin-bottom: 20px;
            }

            h1 {
            margin-bottom: 10px;
            }
            span.button {
            width: 200px;
            @media (min-width: 800px) {
                margin-top: 40px;
            }
            @media (max-width: 799px) {
                margin-top: 20px;
            }
            > a {
                margin: 0;
                width: 160px;
                display: flex;
                justify-content: center;
            }
            }
        }

        .imagery {
            @media (min-width: 1400px) {
            margin-right: 10%;
            }
            @media (min-width: 800px) and (max-width: 1000px) {
            img {
                width: 100%;
                max-width: 466px;
            }
            }
            @media (min-width: 800px) {
            flex-direction: column;
            }
            @media (max-width: 799px) {
            flex-direction: column-reverse;
            img {
                width: 258px;
                margin-top: 5px;
            }
            }
        }
    }
`;
