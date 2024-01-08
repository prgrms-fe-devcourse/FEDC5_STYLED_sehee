import { UserResponseType } from '@/Types/Response';

export interface ValidateSignUpProps {
  email: string;
  fullName: string;
  password: string;
}

export interface Props {
  onSuccessCallback: (response: UserResponseType) => void;
  onErrorCallback: (message: string) => void;
}
