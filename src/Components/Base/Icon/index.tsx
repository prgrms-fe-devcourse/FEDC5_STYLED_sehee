import StyledIconContainer from './style';
import IconProps from './type';

const Icon = ({ name, className = 'material-icons', ...props }: IconProps) => {
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
