export interface Props {
  onSelectChannel?: (channelName: string) => void;
  onSubmit?: () => void;
  initialValue?: string;
}
