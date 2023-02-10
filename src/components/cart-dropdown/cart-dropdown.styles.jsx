import styled from "styled-components";

import { 
  BaseButton, 
  GoogleSignInButton, 
  InvertedButton 
} from "../button/button.styles";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 280px;
  height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;

  ${CartDropdownContainer} { // target any CartDropdownContainer that is a child of EmptyMessage
     
  }
`
export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: scroll;

  ${BaseButton}, 
  ${GoogleSignInButton}, 
  ${InvertedButton}  { // targets buttons that live inside CartItems 
    margin-top: auto;
  }
`
