import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        color: ${(props) => props.theme.text};
        background-color: ${(props) => props.theme.background};
    }
`;

export default GlobalStyle;
