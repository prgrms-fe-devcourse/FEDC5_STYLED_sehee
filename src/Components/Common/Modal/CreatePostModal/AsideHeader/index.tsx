import { useQuery } from '@tanstack/react-query';
import { Props } from './type';
import { StyledContainer, StyledHeader, StyledWrapper } from './style';
import Button from '@/Components/Base/Button';
import DropDown from '@/Components/Common/DropDown';
import channels from '@/Constants/Channels';
import { checkAuth } from '@/Services/Auth';
import Avatar from '@/Components/Base/Avatar';
import Skeleton from '@/Components/Base/Skeleton';

const AsideHeader = ({ onSelectChannel, onSubmit, post }: Props) => {
  const { data } = useQuery({
    queryKey: ['currentUser'],
    queryFn: checkAuth,
  });

  const reversedChannel = Object.entries(channels).reduce(
    (acc: Record<string, string>, [key, value]) => {
      acc[value] = key;
      return acc;
    },
    {},
  );

  const handleSelect = async (option: string) => {
    if (onSelectChannel) {
      onSelectChannel(reversedChannel[option]);
    }
  };

  return (
    <StyledWrapper>
      <StyledHeader>
        <DropDown // 카테고리 드롭다운
          options={Object.values(channels)}
          onSelect={handleSelect}
        />
        <Button // 공유, 수정하기 버튼
          onClick={onSubmit}
          width="8rem"
          height="4rem"
          textSize="middle"
          style={{ padding: '0px 10px', minWidth: '7rem' }}
        >
          {post ? '수정하기' : '공유하기'}
        </Button>
      </StyledHeader>
      <StyledContainer>
        {data ? (
          <>
            <Avatar // 유저 프로필
              src={
                data.image ||
                'https://user-images.githubusercontent.com/17202261/101670093-195d9180-3a96-11eb-9bd4-9f31cbe44aea.png'
              }
              size={40}
            />
            {data.fullName}
          </>
        ) : (
          <>
            <Skeleton.Circle size="40px" />
            <Skeleton.Paragraph
              line={1}
              width="10rem"
              height="2rem"
            />
          </>
        )}
      </StyledContainer>
    </StyledWrapper>
  );
};

export default AsideHeader;
