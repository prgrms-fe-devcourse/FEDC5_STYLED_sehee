import StyledIconContainer from './style';
import IconProps from './type';

const Icon = ({
  name,
  className = 'material-symbols-outlined',
  ...props
}: IconProps) => {
  return (
    <StyledIconContainer
      {...props}
      className={className}
    >
      {name}
    </StyledIconContainer>
  );
};

export default Icon;
