import { css } from '@emotion/react';

export const reset = css`
  * {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
  }
  body,
  ul,
  li,
  h1,
  h2,
  h3,
  p {
    padding: 0;
    margin: 0;
  }
  img {
    vertical-align: top;
  }
  h1,
  h2,
  h3 {
    font: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font: inherit;
    border: 0;
    background: none;
  }
  button:enabled {
    cursor: pointer;
  }
  ul,
  li {
    list-style: none;
  }
`;
