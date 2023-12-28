import { styled, css } from 'styled-components';

const buttonColorPreset = {
  default: css`
    background-color: ${(props) => props.theme.colors.buttonBackground};
    color: ${(props) => props.theme.colors.buttonText};
  `,
  black: css`
    background-color: #000000;
    color: #ffffff;
  `,
  gray: css`
    background-color: #e0e0e0;
    color: #ffffff;
  `,
  white: css`
    background-color: #ffffff;
    color: #000000;
  `,
  blue: css`
    background-color: #0095f6;
    color: #ffffff;
  `,
  purple: css`
    background-color: #7752fe;
    color: #ffffff;
  `,
  transparent: css`
    background-color: transparent;
    color: ${(props) => props.theme.colors.text};
  `,
};

const buttonBorderRoundPreset = {
  none: css`
    border-radius: none;
  `,
  sm: css`
    border-radius: ${(props) => props.theme.size.small};
  `,
  md: css`
    border-radius: ${(props) => props.theme.size.medium};
  `,
  lg: css`
    border-radius: ${(props) => props.theme.size.large};
  `,

  // TODO: Hover 효과
};

const StyledButton = styled.button<{
  $color: 'default' | 'black' | 'gray' | 'white' | 'blue' | 'purple';
  $width: number;
  $height: number;
  $borderRound: 'none' | 'sm' | 'md' | 'lg';
  $isActive: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ $width }) => `${$width}rem`};
  height: ${({ $height }) => `${$height}rem`};

  ${({ $color }) => $color && buttonColorPreset[$color]}
  ${({ $borderRound }) =>
    $borderRound && buttonBorderRoundPreset[$borderRound]};
  ${({ $isActive }) => $isActive && 'background-color: #000000;'};
`;

export default StyledButton;
