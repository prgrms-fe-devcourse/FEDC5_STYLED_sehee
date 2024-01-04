/* eslint no-underscore-dangle: 0 */
// _id 파라미터 사용시 eslint 에러 발생 방지
import { useTheme } from 'styled-components';
import { MouseEvent, useEffect, useState } from 'react';
import {
  StyledCategoryList,
  StyledCategoryTitle,
  StyledCategoryTitleContainer,
  StyledHeaderContainer,
  StyledLeftContainer,
  StyledMainContentContainer,
  StyledRightContainer,
  StyledWrapper,
  catergoryButtonStyle,
} from './style';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import { getChannels } from '@/Services/Channel';
import { ChannelType } from '@/Types/ChannelType';
import channels from '@/Constants/Channels';

const HomePage = () => {
  const { colors, size } = useTheme();

  const [channelList, setChannelList] = useState<ChannelType[]>([]);
  const [currentChannelId, setCurrentChannelId] = useState('all');

  const handleClickChannel = (e: MouseEvent<HTMLButtonElement>) => {
    const channelId = e.currentTarget.dataset.id;

    return channelId && setCurrentChannelId(channelId);
  };

  useEffect(() => {
    /**
     * 모든 채널을 fetch하는 함수
     * @return setChannelList 함수 실행 void
     */
    const fetchChannels = async () => {
      const channelData = await getChannels();

      return channelData && setChannelList(channelData);
    };

    fetchChannels();
  }, []);

  return (
    <>
      {/* Header 컴포넌트 있다고 가정 */}
      <StyledHeaderContainer />

      <StyledWrapper>
        <StyledLeftContainer>
          <StyledCategoryTitleContainer>
            <StyledCategoryTitle>카테고리</StyledCategoryTitle>
            {/* 카테고리 채널 추가 버튼 */}
            <Button
              width={size.large}
              height={size.large}
              borderRadius="0.5rem"
              textSize={size.medium}
              backgroundColor={colors.background}
              hoverBackgroundColor={colors.backgroundGrey}
              style={catergoryButtonStyle}
            >
              <Icon
                name="add"
                style={{ color: `grey`, fontSize: `${size.large}` }}
              />
            </Button>
          </StyledCategoryTitleContainer>
          {/* 채널 버튼 리스트 */}
          <StyledCategoryList>
            <Button
              data-id="all"
              width="80%"
              height={size.doubleLarge}
              borderRadius="1rem"
              textSize={size.medium}
              backgroundColor={
                currentChannelId === 'all'
                  ? colors.backgroundGrey
                  : colors.background
              }
              hoverBackgroundColor={
                currentChannelId === 'all'
                  ? colors.backgroundGrey
                  : colors.focusHover
              }
              textColor={colors.text}
              style={catergoryButtonStyle}
              onClick={handleClickChannel}
            >
              전체
            </Button>
            {channelList.map((channel) => {
              return (
                <Button
                  key={channel._id}
                  data-id={channel._id}
                  width="80%"
                  height={size.doubleLarge}
                  borderRadius="1rem"
                  textSize={size.medium}
                  backgroundColor={
                    currentChannelId === channel._id
                      ? colors.backgroundGrey
                      : colors.background
                  }
                  hoverBackgroundColor={
                    currentChannelId === channel._id
                      ? colors.backgroundGrey
                      : colors.focusHover
                  }
                  textColor={colors.text}
                  style={catergoryButtonStyle}
                  onClick={handleClickChannel}
                >
                  {channels[channel.name]}
                </Button>
              );
            })}
          </StyledCategoryList>
        </StyledLeftContainer>
        <StyledMainContentContainer />
        <StyledRightContainer />
      </StyledWrapper>
    </>
  );
};

export default HomePage;
