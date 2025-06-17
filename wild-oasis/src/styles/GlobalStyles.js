import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --color-background: #ffffff;
    --color-text: #1a1a1a;
    --color-grey-0: #fff;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-700: #374151;
    --image-grayscale: 0;
    --image-opacity: 100%;
  }

  .dark-mode {
    --color-background: #1a1a1a;
    --color-text: #f9fafb;
    --color-grey-0: #0b0b0b;
    --color-grey-100: #1f1f1f;
    --color-grey-200: #2c2c2c;
    --color-grey-700: #d4d4d4;
    --image-grayscale: 10%;
    --image-opacity: 90%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    transition: background-color 0.3s, border 0.3s;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: "Poppins", sans-serif;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
    transition: background-color 0.3s, color 0.3s;
  }

  img {
    max-width: 100%;
    filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
  }

  button {
    cursor: pointer;
    font: inherit;
  }

  input, textarea, select {
    font: inherit;
    color: inherit;
  }
`;

export default GlobalStyles;
