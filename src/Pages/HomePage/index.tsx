/* eslint no-underscore-dangle: 0 */
// _id 파라미터 사용시 eslint 에러 발생 방지
import { useTheme } from 'styled-components';
import { useEffect, useState } from 'react';
import {
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

  useEffect(() => {
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
                style={{ color: `grey` }}
              />
            </Button>
          </StyledCategoryTitleContainer>
          {channelList.map((channel) => {
            return (
              <Button
                key={channel._id}
                width="80%"
                height={size.doubleLarge}
                borderRadius="1rem"
                textSize={size.medium}
                backgroundColor={colors.background}
                hoverBackgroundColor={colors.backgroundGrey}
                textColor={colors.text}
                style={catergoryButtonStyle}
              >
                {channels[channel.name]}
              </Button>
            );
          })}
        </StyledLeftContainer>
        <StyledMainContentContainer />
        <StyledRightContainer />
      </StyledWrapper>
    </>
  );
};

export default HomePage;
