// import React from 'react'

import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";
/*This guarantees the element will stretch across the entire grid vertically, no matter how many rows exist.*/
export default function Sidebar() {
  const Sidebar = styled.aside`
    padding: 3.8rem 2.8rem;
    border-right: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-100);
    grid-row: 1/-1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  `;
  return (
    <Sidebar>
      <Logo />
      <MainNav />
    </Sidebar>
  );
}
