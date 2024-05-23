import { axiosAuthInstance, axiosCommonInstance } from '@/Api/axiosInstance';
import { GetUserListRequestType } from '@/Types/Request';
import { UserType } from '@/Types/UserType';
import { DOMAIN } from '@/Constants/Api';
import handleError from '@/Api/handleError';

/**
 * @brief 전체 사용자 목록을 불러옵니다.
 * @details 디폴트 값은 offset = 0, limit = 10 이며, 선택 속성입니다.
 * 커스텀하여 불러오고 싶다면 {} 중괄호 내부에 offset, limit 값을 지정하도록 합니다.
 */
export const getUsers = async ({
  offset = 0,
  limit = 10,
}: GetUserListRequestType = {}) => {
  try {
    const res = await axiosCommonInstance.get<UserType[]>(DOMAIN.USERS, {
      params: {
        offset,
        limit,
      },
    });

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};

/**
 * @brief 현재 접속 중인 사용자 목록을 불러옵니다.
 */
export const getOnlineUsers = async () => {
  try {
    const res = await axiosCommonInstance.get<UserType[]>(DOMAIN.ONLINE_USERS);

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};

/**
 * @brief 특정한 사용자 정보를 불러옵니다.
 */
export const getUser = async (userId: string) => {
  try {
    const res = await axiosCommonInstance.get<UserType>(DOMAIN.USER(userId));

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};

/**
 * @brief 나의 프로필 이미지를 변경합니다.
 */
export const updateProfileImage = async (image: File) => {
  try {
<<<<<<< Updated upstream
=======
    const resizedImage = await resizeImage(image, 138, 138, 'JPEG');
>>>>>>> Stashed changes
    const formData = new FormData();
    formData.append('isCover', 'false');
    formData.append('image', image);

    const res = await axiosAuthInstance.post<UserType>(
      DOMAIN.UPLOAD_PHOTO,
      formData,
    );

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};

/**
 * @brief 나의 커버 이미지를 변경합니다.
 */
export const updateCoverImage = async (image: File) => {
  try {
<<<<<<< Updated upstream
=======
    const resizedImage = await resizeImage(image, 138, 138, 'JPEG');
>>>>>>> Stashed changes
    const formData = new FormData();
    formData.append('isCover', 'true');
    formData.append('image', image);

    const res = await axiosAuthInstance.post<UserType>(
      DOMAIN.UPLOAD_PHOTO,
      formData,
    );

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};
