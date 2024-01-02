import StyledIconContainer from './style';
import IconProps from './type';

/**
 * 채워지지 않은 아이콘 => className = 'material-symbols-outlined'로 지정
 */
const Icon = ({
  name,
  className = 'material-icons',
  ref,
  ...props
}: IconProps) => {
  return (
    <StyledIconContainer
      {...props}
      ref={ref}
      className={className}
    >
      {name}
    </StyledIconContainer>
  );
};

export default Icon;
