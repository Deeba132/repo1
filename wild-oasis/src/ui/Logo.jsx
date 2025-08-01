import { useContext } from "react";
import styled from "styled-components";
import { DarkModeContext } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useContext(DarkModeContext);
  const src = isDarkMode
    ? "../../public/img/logo-dark.png"
    : "../../public/img/logo-light.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
