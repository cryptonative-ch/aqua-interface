import { defaultRebootTheme } from 'styled-reboot'
import * as CSS from 'csstype'
import { backgroundColor } from 'styled-system'

export type ThemeGrid = {
  display: CSS.Property.Grid
  gridTemplateColumns: CSS.Property.GridTemplateColumns[]
  gap: CSS.Property.Gap[]
}

export const grid: ThemeGrid = {
  display: 'grid',
  gridTemplateColumns: [`478px 478px`, '100%'],
  gap: [`24px 24px`, `16px`],
}

export type ThemeRadii = {
  base: CSS.Property.BorderRadius
  circle: CSS.Property.BorderRadius
}

export const radii: ThemeRadii = {
  base: '0px',
  circle: '50%',
}

export type ThemeColors = {
  text: CSS.Property.Color
  secondaryText: CSS.Property.Color
  tertiaryText: CSS.Property.Color
  primaryBackground: CSS.Property.Color
  secondaryBackground: CSS.Property.Color
  highlightBackground: CSS.Property.Color
  highlightColor: CSS.Property.Color
  activeBid: CSS.Property.Color
  inActiveBid: CSS.Property.Color
}

export const colors: ThemeColors = {
  text: '#000629',
  secondaryText: '#7B7F93',
  tertiaryText: '#FFFFFF',
  primaryBackground: '#F2F2F2',
  secondaryBackground: '#DDDDE3',
  highlightBackground: '#FFFFFF',
  highlightColor: '#304FFE',
  activeBid: '#4b9e98',
  inActiveBid: '#e15f5f',
}

export interface ThemeButton {
  color: CSS.Property.Color
  backgroundColor: CSS.Property.Color
}

export type ThemeButtons = {
  [variant: string]: ThemeButton
}

export const buttons: ThemeButtons = {
  primary: {
    color: 'black',
    backgroundColor: 'white',
  },
  Active: {
    color: '#FFFFFF',
    backgroundColor: '#304FFE',
  },
  disabled: {
    color: '#7B7F93',
    backgroundColor: '#DDDDE3',
  },
  inActive: {
    color: '#FFFFFF',
    backgroundColor: '#7B7F93',
  },
  tokensClaimed: {
    color: '#4B9E98',
    backgroundColor: '#4b9e9859',
  },
}

export type ThemeBreakpoints = string[]

export const breakpoints: ThemeBreakpoints = [`480px`, `576px`, `768px`, `992px`, `1200px`, `1441px`, `1600px`]

export type ThemeSpacing = number[]

export const space: ThemeSpacing = [0, 4, 8, 16, 24, 32, 64, 128, 256]

export type ThemeFonts = {
  [key: string]: string
}

export const fonts: ThemeFonts = {
  sans: `'Inter', sans-serif`,
  serif: `'Inter', sans-serif`,
  body: `'Inter', sans-serif`,
}

export type ThemeFontSizes = number[]
export const fontSizes: ThemeFontSizes = [12, 14, 16, 18, 20, 22, 24, 28, 32]

export type ThemelineHeight = number[]
export const lineHeights: ThemelineHeight = [21]

export type ThemeFontWeights = number[]
export const fontWrights: ThemeFontWeights = [500, 600]

export type ThemeHeader = {
  height: number
  backgroundColor: CSS.Property.Color
}

export const header: ThemeHeader = {
  height: 70,
  backgroundColor: '#606c38',
}

export type ThemeFooter = {
  backgroundColor: CSS.Property.Color
}

export const footer: ThemeFooter = {
  backgroundColor: '#222222',
}

export const rebootCSS = {
  ...defaultRebootTheme,
  fontFamilyBase: fonts.sans,
  fontFamilyMonospace: fonts.monospace,
  fontFamilySerif: fonts.serif,
  fontWeightBase: 400,
  headingsMarginBottom: `1.5rem`,
}

export const theme = {
  // Reboot
  ...rebootCSS,

  // Styled System
  breakpoints,
  colors,
  space,
  fonts,
  fontSizes,
  buttons,
  radii,
  grid,

  // components
  header,
  footer,
}
