import { iTheme } from "./styled/theme";

declare module "styled-components" {
	interface DefaultTheme extends iTheme {}
}
