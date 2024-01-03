import { axiosAuthInstance } from '@/Api/axiosInstance';
import { DOMAIN } from '@/Constants/Api';
import { ConversationType } from '@/Types/ConversationType';
import { MessageType } from '@/Types/MessageType';
import { PostCreateMessageRequestType } from '@/Types/Request';

/**
 * @brief 나의 메시지함(소통한 유저 목록)을 불러옵니다.
 */
export const getConversations = async () => {
  try {
    const res = await axiosAuthInstance.get<ConversationType[]>(
      DOMAIN.CONVERSATIONS,
    );

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * @brief 특정 사용자와 소통한 메시지 목록을 불러옵니다.
 */
export const getMessages = async (userId: string) => {
  try {
    const res = await axiosAuthInstance.get<MessageType[]>(DOMAIN.MESSAGES, {
      params: {
        userId,
      },
    });

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * @brief 특정 사용자에게 메시지를 전송합니다.
 * @details {} 중괄호 내부에 반드시 message, receiver 설정해야 합니다.
 * @param receiver 상대 사용자 id
 * @todo 추후에 receiver -> userId로 PostCreateMessageRequestType 변경 가능성 있습니다.
 */
export const createMessage = async ({
  message,
  receiver,
}: PostCreateMessageRequestType) => {
  try {
    const res = await axiosAuthInstance.post<MessageType>(DOMAIN.SEND_MESSAGE, {
      message,
      receiver,
    });

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * @brief 특정 사용자와 나눈 메시지를 읽음처리 합니다.
 * @param userId 상대 사용자 id
 * @return 성공 여부를 알려줍니다.
 */
export const readMessage = async (userId: string) => {
  try {
    await axiosAuthInstance.put(DOMAIN.READ_MESSAGES, {
      sender: userId,
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
