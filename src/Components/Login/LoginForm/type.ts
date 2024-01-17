import { UserResponseType } from '@/Types/Response';

export interface ValidateLoginProps {
  email: string;
  password: string;
}

export interface Props {
  onSuccessCallback: (response: UserResponseType) => void;
  onErrorCallback: () => void;
}
