import Avatar from '@/Components/Base/Avatar';
import { UserType } from '@/Types/UserType';
import FollowProfile from './FollowInfo';
import { StyledProfileInfoContainer } from './style';
import MyProfileInfo from './MyProfileInfo';
import Button from '@/Components/Base/Button';
import UserProfileInfo from './UserProfileInfo';

interface Props {
  userData: UserType;
  myprofile: boolean;
}

const ProfileInfo = ({ userData, myprofile }: Props) => {
  return (
    <StyledProfileInfoContainer>
      {myprofile ? (
        <Avatar
          src={userData.image}
          size={140}
          onClick={() => console.log('change image')}
        />
      ) : (
        <Avatar
          src={userData.image}
          size={140}
        />
      )}
      <div>
        {myprofile ? (
          <MyProfileInfo name={userData.fullName} />
        ) : (
          <UserProfileInfo name={userData.fullName} />
        )}

        <FollowProfile
          posts={userData.posts.length}
          followers={userData.followers.length}
          following={userData.following.length}
        />
      </div>
    </StyledProfileInfoContainer>
  );
};

export default ProfileInfo;
