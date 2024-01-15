import styled from 'styled-components';
import {
  StyledDropDownButtonProp,
  StyledDropDownItemProp,
  StyledLabelProp,
} from './type';

export const StyledDropDown = styled.div<{ $isShow: boolean }>`
  position: relative;
  display: ${(props) => (props.$isShow ? 'inline-block' : 'none')};
`;

export const StyledLabel = styled.span<StyledLabelProp>`
  position: absolute;
  left: 0.8rem;
  top: -1rem;
  color: ${({ $labelTextColor }) => $labelTextColor};
  font-size: ${({ $labelTextSize }) => $labelTextSize};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  padding: 0rem 0.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.black};
  user-select: none;
`;

export const StyledDropDownButton = styled.button<StyledDropDownButtonProp>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
  padding: 1rem 1.2rem;
  font-size: ${({ $textSize }) => $textSize};
  border: 2px solid black;
  border-radius: 1rem;
  gap: 1.2rem;
`;

export const StyledDropDownOption = styled.div<{ $width: string }>`
  display: block;
  position: absolute;
  width: ${({ $width }) => $width};
  z-index: 12;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9;
  border-radius: 1rem;
  overflow: hidden;
`;

export const StyledDropDownItem = styled.div<StyledDropDownItemProp>`
  width: 100%;
  padding: 1.2rem 1.6rem;
  color: ${({ $itemTextColor }) => $itemTextColor};
  font-size: ${({ $itemTextSize }) => $itemTextSize};
  user-select: none;
  cursor: pointer;
  transition: transform 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
    transform: scale(1.1);
  }
`;
