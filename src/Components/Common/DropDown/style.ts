import styled from 'styled-components';
import { StyledDropDownButtonProp, StyledDropDownItemProp } from './type';

export const StyledDropDown = styled.div`
  position: relative;
  display: inline-block;
`;

export const StyledDropDownButton = styled.button<StyledDropDownButtonProp>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  padding: 10px 12px;
  font-size: ${({ $textSize }) => $textSize};
  border: 2px solid black;
  border-radius: 1rem;
  gap: 12px;
`;

export const StyledDropDownOption = styled.div<{ $width: string }>`
  display: block;
  position: absolute;
  width: ${({ $width }) => $width};
  z-index: 1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9;
  border-radius: 1rem;
  overflow: hidden;
`;

export const StyledDropDownItem = styled.div<StyledDropDownItemProp>`
  width: 100%;
  padding: 12px 16px;
  background-color: ${({ $itemBackgroundColor }) => $itemBackgroundColor};
  color: ${({ $itemTextColor }) => $itemTextColor};
  font-size: ${({ $itemTextSize }) => $itemTextSize};
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;
