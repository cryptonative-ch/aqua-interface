import { RebootTheme } from 'styled-reboot'
import { Theme as StyledSystemTheme } from 'styled-system'
import {
  ThemeBreakpoints,
  ThemeFontSizes,
  ThemeColors,
  ThemeFooter,
  ThemeHeader,
  ThemeRadii,
  ThemeFonts,
  ThemeSpacing,
} from './theme'

declare module 'styled-components' {
  export interface DefaultTheme extends RebootTheme, StyledSystemTheme {
    space: ThemeSpacing
    header: ThemeHeader
    footer: ThemeFooter
    breakpoints: ThemeBreakpoints
    fonts: ThemeFonts
    fontSizes: ThemeFontSizes
    colors: ThemeColors
    radii: ThemeRadii
  }
}
