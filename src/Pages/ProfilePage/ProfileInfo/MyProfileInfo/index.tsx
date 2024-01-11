import Button from '@/Components/Base/Button';
import { StyledButtonContainer, StyledName } from '../style';

interface Props {
  name: string;
}
const MyProfileInfo = ({ name }: Props) => {
  return (
    <StyledButtonContainer>
      <StyledName>{name}</StyledName>
      <Button
        type="button"
        height="3rem"
        textSize="1.4rem"
        width="10rem"
        borderRadius="1rem"
        style={{ marginRight: '1rem', marginTop: '.5rem' }}
      >
        비밀번호 변경
      </Button>
    </StyledButtonContainer>
  );
};

export default MyProfileInfo;
