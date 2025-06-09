// import React from 'react'

import styled from "styled-components";

export default function Header() {
  const Header = styled.header`
    background-color: var(--color-grey-300);
    padding: 1.2rem 4.5rem;
    border-bottom: 1px solid var(--color-grey-300);
    /* grid-column: 1 / -1; */
  `;
  return <Header>Header</Header>;
}
