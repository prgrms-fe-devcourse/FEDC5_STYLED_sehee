import { useQuery } from '@tanstack/react-query';

import Button from '@/Components/Base/Button';
import DropDown from '@/Components/Common/DropDown';
import Avatar from '@/Components/Base/Avatar';
import Skeleton from '@/Components/Base/Skeleton';

import { StyledContainer, StyledHeader, StyledWrapper } from './style';
import channels from '@/Constants/Channels';
import { checkAuth } from '@/Services/Auth';
import { Props } from './type';

/**
 * @brief 채널 선택 드롭다운, 포스트 작성 제출 버튼, 유저 프로필 정보를 담고 있는 AisdeHeader 컴포넌트입니다.
 * @param 드롭다운 옵션을 선택하거나 제출 버튼을 클릭하면 onSelectChannel, onSubmit 콜백을 상위 컴포넌트에게 전달합니다.
 */

const AsideHeader = ({ onSelectChannel, onSubmit, initialValue }: Props) => {
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
          initialValue={initialValue}
        />
        <Button // 공유, 수정하기 버튼
          onClick={onSubmit}
          width="8rem"
          height="4rem"
          textSize="middle"
          style={{ padding: '0px 10px', minWidth: '7rem' }}
        >
          {initialValue ? '수정하기' : '공유하기'}
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
