import { createGlobalStyle } from 'styled-components'
import colors from './context/styles/colors';

export default createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        background-color: ${colors["background-1"]};
        color: ${colors["foreground-2"]};
        font-family: 'Roboto', sans-serif;
        letter-spacing: 0.2px;
        height: 100%;

        // desktop
        @media (min-width: 800px) {
            font-size: 24px;
        }

        // mobile
        @media (max-width: 799px) {
            font-size: 14px;
        }
    }

    .flash-app-container, .flash {
        height: 100%;
    }

    h1 {
        // desktop
        @media (min-width: 800px) {
            font-size: 72px;
        }

        // mobile
        @media (max-width: 799px) {
            font-size: 48px;
        }
    }

    h2 {
        // desktop
        @media (min-width: 800px) {
            font-size: 36px;
        }

        // mobile
        @media (max-width: 799px) {
            font-size: 24px;
        }

    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: 400;
        color: ${colors["foreground-2"]};
        margin: 0;
    }

    .pop {
        color: ${colors.primary};
    }

    textarea {
        background-color: ${colors["background-2"]};
        color: ${colors["foreground-2"]};
        border: 0px;
        border-bottom: 1px solid ${colors["foreground-2"]};
        resize: none;
        font-size: 100%;
        padding: 5px;
    }
    textarea:focus {
        outline: none;
        border-bottom: 1px solid ${colors.primary};
    }

    input[type=file] {
        outline: none;
        padding-bottom: 5px;
        cursor: pointer;
    }
    input[type=file]:focus {
        border-bottom: 1px solid ${colors.primary};
    }


    input[type=text] {
        background-color: ${colors["background-2"]};
        color: ${colors["foreground-2"]};
        border: 0px;
        border-bottom: 1px solid ${colors["foreground-2"]};
        resize: none;
        font-size: 100%;
        padding: 5px;
    }
    input[type=text]:focus {
        outline: none;
        border-bottom: 1px solid ${colors.primary};
    }
`;