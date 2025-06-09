import styled, { css } from "styled-components";
const ex = 10 > 5;
const H1 = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: ${ex ? "30px" : "5px"};
      font-weight: 600;
      background-color: yellow;
    `}
  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: ${ex ? "15px" : "5px"};
      font-weight: 600;
      background-color: yellow;
    `}
    ${(props) =>
    props.type === "h1" &&
    css`
      font-size: ${ex ? "8px" : "5px"};
      font-weight: 600;
      background-color: yellow;
    `}
`;
export default H1;
