import styled from 'styled-components';

const StyledIconContainer = styled.span`
  display: inline-block;
`;

interface IconProps {
  iconName: string;
  iconClass?: string;
  iconColor?: string;
  iconSize?: number;
}

const Icon = ({ iconName, iconClass, iconColor, iconSize }: IconProps) => {
  const iconStyle = {
    color: iconColor,
    fontSize: `${iconSize}rem`,
  };

  return (
    <StyledIconContainer
      style={iconStyle}
      className={iconClass}
    >
      {iconName}
    </StyledIconContainer>
  );
};

Icon.defaultProps = {
  iconClass: 'material-symbols-outlined',
  iconColor: '',
  iconSize: 2,
};

export default Icon;
