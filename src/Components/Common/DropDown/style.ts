import styled from 'styled-components';
import { StyledDropDownButtonProp, StyledDropDownItemProp } from './type';

export const StyledDropDown = styled.div`
  position: relative;
  display: inline-block;
`;

export const StyledDropDownButton = styled.button<StyledDropDownButtonProp>`
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
`;

export const StyledDropDownOption = styled.div<{ $size: string }>`
  display: block;
  position: absolute;
  min-width: ${({ $size }) => $size};
  z-index: 1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9;
`;

export const StyledDropDownItem = styled.div<StyledDropDownItemProp>`
  width: 100%;
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;
