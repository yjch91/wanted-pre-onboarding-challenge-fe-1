import styled from "styled-components";

export const Button = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.0;
  border: 1px solid black;
  background-color: aqua;
  cursor: pointer;
  margin: 2px;
  &:hover:enabled {
    filter: brightness(0.8);
  }
`;