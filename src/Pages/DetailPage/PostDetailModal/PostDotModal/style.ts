export interface PostDotModalProps {
  isFollow?: boolean;
  postAuthorId: string;
  onChangeOpen: (openState: boolean) => void;
  onCloseDotModal: (openState: boolean) => void;
  onCancelFollow: (openState: boolean) => void;
}

export const dotModalButtonStyle = {
  padding: '1.5rem',
};

export const notFirstDotModalButtonStyle = {
  padding: '1.5rem',
  borderTop: '1px solid #CCCCCC',
};
