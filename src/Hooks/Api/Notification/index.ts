import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotifications, sendNotifications } from '@/Services/Notification';
import { PostNotificationRequestType } from '@/Types/Request';
import QUERY_KEYS from '@/Constants/queryKeys';

export const useGetNotifications = () => {
  const { data: NotificationData } = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATION_LIST],
    queryFn: getNotifications,
  });

  return {
    NotificationData,
  };
};

export const useCreateNotification = (onError?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: createNotification, data } = useMutation({
    mutationFn: ({
      notificationType,
      notificationTypeId,
      userId,
      postId,
    }: PostNotificationRequestType) =>
      sendNotifications({
        notificationType,
        notificationTypeId,
        userId,
        postId,
      }),
    onError,
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.NOTIFICATION_LIST] });
    },
  });

  return { createNotification, createdNotification: data };
};
