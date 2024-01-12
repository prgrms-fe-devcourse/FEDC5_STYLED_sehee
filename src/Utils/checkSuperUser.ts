import { UserType } from '@/Types/UserType';

const filterSuperUser = (userData: UserType[]) => {
  const filtereduserList = userData.filter(({ role }) => role !== 'SuperAdmin');

  return filtereduserList;
};

export default filterSuperUser;
