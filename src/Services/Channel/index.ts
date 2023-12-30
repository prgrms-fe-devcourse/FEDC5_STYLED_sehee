import axiosInstance from '@/Api/axiosInstance';
import { ChannelType } from '@/Types/ChannelType';
import { DOMAIN } from '@/Constants/Api';

/**
 * @brief 채널 목록을 불러옵니다.
 * @details 실패할 경우, 빈 배열을 반환합니다.
 */
export const getChannels = async () => {
  try {
    const res = await axiosInstance.get<ChannelType[]>(DOMAIN.CHANNELS);

    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

/**
 * @brief 특정 채널 정보를 불러옵니다.
 * @details 채널 이름이 한글일 때, 인코딩이 필요합니다.
 * 실패할 경우, null을 반환합니다.
 */
export const getChannel = async (channelName: string) => {
  try {
    const res = await axiosInstance.get<ChannelType>(
      DOMAIN.CHANNEL(channelName),
    );

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
