import { axiosAuthInstance, axiosCommonInstance } from '@/Api/axiosInstance';
import { ChannelType } from '@/Types/ChannelType';
import { DOMAIN } from '@/Constants/Api';
import { PostChannelCreateRequestType } from '@/Types/Request';

/**
 * @brief 채널 목록을 불러옵니다.
 * @return 실패할 경우, 빈 배열을 반환합니다.
 */
export const getChannels = async () => {
  try {
    const res = await axiosCommonInstance.get<ChannelType[]>(DOMAIN.CHANNELS);

    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

/**
 * @brief 특정 채널 정보를 불러옵니다.
 * @details 채널 이름이 한글일 때, 인코딩이 필요합니다.
 * @return 실패할 경우, null을 반환합니다.
 */
export const getChannel = async (channelName: string) => {
  try {
    const res = await axiosCommonInstance.get<ChannelType>(
      DOMAIN.CHANNEL(channelName),
    );

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * @brief 채널을 생성합니다.
 * @detail 채널 추가는 어드민 계정으로만 가능합니다. 포스트를 남기기 위해서는 채널이 필요합니다.
 * @param authRequired 채널 내용을 로그인한 사람만 볼 수 있는지 여부
 * @param description 채널에 대한 설명
 * @param name 채널 이름
 * @return 리턴값은 별도로 존재하지 않습니다.
 */
export const createChannel = async ({
  authRequired,
  description,
  name,
}: PostChannelCreateRequestType) => {
  try {
    await axiosAuthInstance.post(DOMAIN.CREATE_CHANNEL, {
      authRequired,
      description,
      name,
    });
  } catch (e) {
    console.error(e);
  }
};
