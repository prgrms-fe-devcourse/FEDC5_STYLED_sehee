import Button from '@/Components/Base/Button';
import { StyledButtonContainer, StyledName } from '../style';

interface Props {
  name: string;
}
const UserProfileInfo = ({ name }: Props) => {
  return (
    <StyledButtonContainer>
      <StyledName>{name}</StyledName>
      <Button
        type="button"
        height="3rem"
        textSize="1.4rem"
        width="7rem"
        borderRadius="1rem"
        style={{ marginRight: '1rem', marginTop: '.5rem' }}
      >
        팔로우
      </Button>
      <Button
        type="button"
        height="3rem"
        textSize="1.4rem"
        width="10rem"
        borderRadius="1rem"
        style={{ marginRight: '1rem', marginTop: '.5rem' }}
      >
        메시지 보내기
      </Button>
    </StyledButtonContainer>
  );
};

export default UserProfileInfo;
