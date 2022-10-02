import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html,
    body {
        background-color: ${(props) => props.theme.background};
    }
    
    select,
    input,
    button {
        cursor: pointer;
        border: none;
        background-color: ${(props) => props.theme.background};
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        color: ${(props) => props.theme.text};
    }
`;

export default GlobalStyle;
