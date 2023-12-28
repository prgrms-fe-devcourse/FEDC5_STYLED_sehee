import styled from 'styled-components';

const IconContainer = styled.span`
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
    <IconContainer
      style={iconStyle}
      className={iconClass}
    >
      {iconName}
    </IconContainer>
  );
};

Icon.defaultProps = {
  iconClass: 'material-symbols-outlined',
  iconColor: '',
  iconSize: 2,
};

export default Icon;
