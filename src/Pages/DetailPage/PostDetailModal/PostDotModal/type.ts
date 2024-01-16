export interface PostDotModalProps {
  postId: string;
  isFollow?: boolean;
  postAuthorId: string;
  onChangeOpen: (openState: boolean) => void;
  onCloseDotModal: (openState: boolean) => void;
  onCancelFollow: (openState: boolean) => void;
}
