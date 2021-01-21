import { createGlobalStyle } from 'styled-components'
import { reboot } from 'styled-reboot'
import './fonts.css'

export const GlobalStyle = createGlobalStyle`

  ${reboot}

  html,
  body,
  #root {
    height: 100%;
    width: 100%;
  }

  ::selection {
    background-color: #222;
    color: #fff;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed;
    color: ${props => props.theme.colors.text};
    text-align: left;
    background-color: ${props => props.theme.colors.background};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${props => props.theme.fonts.headings};
  }

  /* type */
  h1 {
    font-size: ${props => props.theme.fontSizes[6]}px;
    font-weight: 300;
  }

  h2 {
    font-size: ${props => props.theme.fontSizes[5]}px;
    font-weight: 300;
  }

  h3 {
    font-size: ${props => props.theme.fontSizes[4]}px;
    font-weight: 300;
  }

  h4 {
    font-size: ${props => props.theme.fontSizes[3]}px;
    font-weight: 300;
  }

  h5 {
    font-size: ${props => props.theme.fontSizes[2]}px;
    font-weight: 300;
  }

  h6 {
    font-size: ${props => props.theme.fontSizes[1]}px;
    font-weight: 300;
  }

  p {
    font-size: ${props => props.theme.fontSizes[0]}px;
    a {
      color: ${props => props.theme.colors.text};
      text-decoration: underline;
    }
    @media (min-width: ${props => props.theme.breakpoints[0]}) {
      & {
         /* fallback for browsers that do not support calc */
        font-size: ${props => props.theme.fontSizes[1]}px;
        font-size: calc(.4vw + ${props => props.theme.fontSizes[0]}px);
      }
    }
    @media (min-width: ${props => props.theme.breakpoints[1]}) {
      & {
        /* fallback for browsers that do not support calc */
        font-size: ${props => props.theme.fontSizes[1]}px;
        font-size: calc(.2vw + ${props => props.theme.fontSizes[0]}px);
      }
    }

  }

  blockquote {
    p {
      font-size: ${props => props.theme.fontSizes[4]}px;
    }
  }

  a {
    color: ${props => props.theme.colors.text};
    transition: all 0.2s;
    &:hover {
      color: ${props => props.theme.colors.text};
    }
  }

  input {
    border-radius: 0x;
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: 1.375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid ${props => props.theme.black};
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  input:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
  }

`
