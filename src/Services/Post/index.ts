import axiosInstance from '@/Api/axiosInstance';
import { DOMAIN } from '@/Constants/Api';
import { PostType } from '@/Types/PostType';
import {
  GetChannelPostRequestType,
  PostCreatePostRequestType,
} from '@/Types/Request';

/**
 * @brief 특정 채널의 포스트 목록을 불러옵니다.
 * @details channelId는 필수, offset, limit는 선택 속성입니다.
 * 디폴트 값은 offset = 0, limit = 10 입니다.
 * 커스텀하여 불러오고 싶다면 {} 중괄호 내부에 offset, limit 값을 지정하도록 합니다.
 * 실패할 경우, 빈 배열을 반환합니다.
 */
export const getPostByChannel = async (
  channelId: string,
  { offset = 0, limit = 10 }: GetChannelPostRequestType = {},
) => {
  try {
    const res = await axiosInstance.get<PostType[]>(
      DOMAIN.POSTS.BY_CHANNEL_ID(channelId),
      {
        params: {
          offset,
          limit,
        },
      },
    );

    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

/**
 * @brief 특정 사용자의 포스트 목록을 불러옵니다.
 * @details userId는 필수, offset, limit는 선택 속성입니다.
 * 디폴트 값은 offset = 0, limit = 10 입니다.
 * 커스텀하여 불러오고 싶다면 {} 중괄호 내부에 offset, limit 값을 지정하도록 합니다.
 * 실패할 경우, 빈 배열을 반환합니다.
 */
export const getPostByUser = async (
  userId: string,
  { offset = 0, limit = 10 }: GetChannelPostRequestType = {},
) => {
  try {
    const res = await axiosInstance.get<PostType[]>(
      DOMAIN.POSTS.BY_USER_ID(userId),
      {
        params: {
          offset,
          limit,
        },
      },
    );

    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

/**
 * @brief 특정 채널에 포스트를 작성합니다.
 * @details {} 중괄호 내부에 반드시 title, image, channelId 설정해야 합니다.
 * 리턴값은 별도로 존재하지 않습니다.
 */
export const createPost = async ({
  title,
  image,
  channelId,
}: PostCreatePostRequestType) => {
  try {
    const formData = {
      title,
      image,
      channelId,
    };

    await axiosInstance.post(DOMAIN.CREATE_CHANNEL, formData);
  } catch (e) {
    console.error(e);
  }
};

/**
 * @brief 특정 포스트의 상세 정보를 불러옵니다.
 * @details 실패할 경우, null을 반환합니다.
 */
export const getPostDetail = async (postId: string) => {
  try {
    const res = await axiosInstance.get(DOMAIN.GET_POST_DETAIL(postId));
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * @brief 내가 작성한 포스트를 수정합니다.
 * @details 리턴값은 별도로 존재하지 않습니다.
 * 추후에 Request Type을 추가하여 파라미터 부분 리팩토링 가능성 있습니다.
 */
export const updatePost = async (
  postId: string,
  title: string,
  image: File,
  channelId: string,
) => {
  try {
    const formData = {
      postId,
      title,
      image,
      channelId,
    };
    await axiosInstance.put(DOMAIN.UPDATE_POST, formData);
  } catch (e) {
    console.error(e);
  }
};
/**
 * @brief 내가 작성한 포스트를 삭제합니다.
 * @details 리턴값은 별도로 존재하지 않습니다.
 */
export const deletePost = async (postId: string) => {
  try {
    await axiosInstance.delete(DOMAIN.DELETE_POST, {
      params: {
        id: postId,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
