import Avatar from '@/Components/Base/Avatar';
import FollowInfo from './FollowInfo';
import { StyledProfileInfoContainer } from './style';
import MyProfileInfo from './MyProfileInfo';
import UserProfileInfo from './UserProfileInfo';
import { Props } from './type';

const ProfileInfo = ({ userData, userDataRefetch, isMyProfile }: Props) => {
  return (
    <StyledProfileInfoContainer>
      {isMyProfile ? (
        <Avatar
          src={userData.image || ''}
          size={140}
          style={{ cursor: 'pointer' }}
          onClick={() => console.log('change image')}
        />
      ) : (
        <Avatar
          src={userData.image || ''}
          size={140}
        />
      )}
      <div>
        {isMyProfile ? (
          <MyProfileInfo name={userData.fullName} />
        ) : (
          <UserProfileInfo name={userData.fullName} />
        )}

        <FollowInfo
          userData={userData}
          userDataRefetch={userDataRefetch}
        />
      </div>
    </StyledProfileInfoContainer>
  );
};

export default ProfileInfo;
