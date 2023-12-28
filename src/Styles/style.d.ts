import 'styled-components';
import { ThemeTypes } from './Theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeTypes {}
}
