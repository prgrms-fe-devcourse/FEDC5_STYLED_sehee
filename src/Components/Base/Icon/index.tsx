import StyledIconContainer from './style';
import IconProps from './type';

const Icon = ({ name, ...props }: IconProps) => {
  return (
    <StyledIconContainer
      {...props}
      className="material-symbols-outlined"
    >
      {name}
    </StyledIconContainer>
  );
};

export default Icon;
