import { PostType } from '@/Types/PostType';

export interface Props {
  onSelectChannel?: (channelName: string) => void;
  onSubmit?: () => void;
  post?: PostType;
}
