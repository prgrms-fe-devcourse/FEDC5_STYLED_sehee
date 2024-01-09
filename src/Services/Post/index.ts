import { axiosAuthInstance, axiosCommonInstance } from '@/Api/axiosInstance';
import handleError from '@/Api/handleError';
import { DOMAIN } from '@/Constants/Api';
import { PostType } from '@/Types/PostType';
import {
  GetChannelPostRequestType,
  PostCreatePostRequestType,
  PutUpdatePostRequestType,
} from '@/Types/Request';

/**
 * @brief 특정 채널의 포스트 목록을 불러옵니다.
 * @details channelId는 필수, offset, limit는 선택 속성입니다.
 * 디폴트 값은 offset = 0, limit = 10 입니다.
 * 커스텀하여 불러오고 싶다면 {} 중괄호 내부에 offset, limit 값을 지정하도록 합니다.
 */
export const getPostByChannel = async (
  channelId: string,
  { offset = 0, limit = 10 }: GetChannelPostRequestType = {},
) => {
  try {
    const res = await axiosCommonInstance.get<PostType[]>(
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
    handleError(e);
    return null;
  }
};

/**
 * @brief 특정 사용자의 포스트 목록을 불러옵니다.
 * @details userId는 필수, offset, limit는 선택 속성입니다.
 * 디폴트 값은 offset = 0, limit = 10 입니다.
 * 커스텀하여 불러오고 싶다면 {} 중괄호 내부에 offset, limit 값을 지정하도록 합니다.
 */
export const getPostByUser = async (
  userId: string,
  { offset = 0, limit = 10 }: GetChannelPostRequestType = {},
) => {
  try {
    const res = await axiosCommonInstance.get<PostType[]>(
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
    handleError(e);
    return null;
  }
};

/**
 * @brief 특정 채널에 포스트를 작성합니다.
 * @details {} 중괄호 내부에 반드시 title, image, channelId 설정해야 합니다.
 * @return 성공 여부를 알려줍니다.
 */
export const createPost = async ({
  title,
  image,
  channelId,
}: PostCreatePostRequestType) => {
  try {
    if (image == null) {
      throw new Error('이미지가 비어있습니다.');
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('channelId', channelId);

    await axiosAuthInstance.post(DOMAIN.CREATE_POST, formData);

    return true;
  } catch (e) {
    handleError(e);
    return false;
  }
};

/**
 * @brief 특정 포스트의 상세 정보를 불러옵니다.
 */
export const getPostDetail = async (postId: string) => {
  try {
    const res = await axiosCommonInstance.get<PostType>(
      DOMAIN.GET_POST_DETAIL(postId),
    );

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};

/**
 * @brief 내가 작성한 포스트를 수정합니다.
 * @details {} 중괄호 내부에 반드시 postId, title, image, channelId 설정해야 합니다.
 * @param title title을 수정하지 않는다면 기존 title을 넣어주세요.
 * @param image image를 수정하지 않는다면 null을 넣어주세요.
 * @return 성공 여부를 알려줍니다.
 */
export const updatePost = async ({
  postId,
  title,
  image,
  channelId,
}: PutUpdatePostRequestType) => {
  try {
    const formData = new FormData();
    formData.append('postId', postId);
    formData.append('title', title);
    if (image instanceof File) {
      formData.append('image', image);
    }
    formData.append('channelId', channelId);

    await axiosAuthInstance.put(DOMAIN.UPDATE_POST, formData);

    return true;
  } catch (e) {
    handleError(e);
    return false;
  }
};
/**
 * @brief 내가 작성한 포스트를 삭제합니다.
 * @return 성공 여부를 알려줍니다.
 */
export const deletePost = async (postId: string) => {
  try {
    await axiosAuthInstance.delete(DOMAIN.DELETE_POST, {
      data: {
        id: postId,
      },
    });

    return true;
  } catch (e) {
    handleError(e);
    return false;
  }
};
