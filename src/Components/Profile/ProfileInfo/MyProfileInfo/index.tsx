import Button from '@/Components/Base/Button';
import { StyledButtonContainer, StyledName } from '../style';
import { NameProps } from '../type';
import Icon from '@/Components/Base/Icon';

const MyProfileInfo = ({ name }: NameProps) => {
  return (
    <StyledButtonContainer>
      <StyledName>
        {name}
        <Icon
          name="edit"
          isFill={false}
          style={{ paddingLeft: '1rem', cursor: 'pointer' }}
          onClick={() => console.log('edit user name')}
        />
      </StyledName>
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
