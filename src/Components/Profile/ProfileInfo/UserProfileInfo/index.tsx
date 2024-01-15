import { useTheme } from 'styled-components';
import Button from '@/Components/Base/Button';
import { StyledButtonContainer, StyledName } from '../style';
import { NameProps } from '../type';

const UserProfileInfo = ({ name }: NameProps) => {
  const { colors } = useTheme();

  return (
    <StyledButtonContainer>
      <StyledName>{name}</StyledName>
      <Button
        type="button"
        height="3rem"
        textSize="1.4rem"
        width="7rem"
        borderRadius="1rem"
        style={{
          marginRight: '1rem',
          marginTop: '.5rem',
          border: `1px solid ${colors.text}`,
        }}
      >
        팔로우
      </Button>
      <Button
        type="button"
        height="3rem"
        textSize="1.4rem"
        width="10rem"
        borderRadius="1rem"
        style={{
          marginRight: '1rem',
          marginTop: '.5rem',
          border: `1px solid ${colors.text}`,
        }}
      >
        메시지 보내기
      </Button>
    </StyledButtonContainer>
  );
};

export default UserProfileInfo;
