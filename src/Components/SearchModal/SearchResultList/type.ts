import { PostType } from '@/Types/PostType';
import { UserType } from '@/Types/UserType';

export default interface Props {
  searchResultData: UserType[] | PostType[] | null;
}
