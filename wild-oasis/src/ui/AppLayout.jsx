import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

export default function AppLayout() {
  const Styledlayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
  `;
  const Main = styled.main`
    background-color: var(--color-grey-0);
    padding: 4rem 4.8rem 6.4rem;
    overflow: scroll;
  `;
  return (
    <Styledlayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </Styledlayout>
  );
}

//header is row not a column takes up 1st row sidebar -1/1 spans over header row and the sidebar and
//main comes in 2nd row 26rem is taken by sidebar and 1fr space taken by whole main
