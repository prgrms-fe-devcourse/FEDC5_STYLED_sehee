import Avatar from '@/Components/Base/Avatar';
import FollowInfo from './FollowInfo';
import { StyledProfileInfoContainer } from './style';
import MyProfileInfo from './MyProfileInfo';
import UserProfileInfo from './UserProfileInfo';
import { Props } from './type';

const ProfileInfo = ({ userData, myprofile }: Props) => {
  return (
    <StyledProfileInfoContainer>
      {myprofile ? (
        <Avatar
          src={userData.image}
          size={140}
          style={{ cursor: 'pointer' }}
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

        <FollowInfo
          posts={userData.posts.length}
          followers={userData.followers.length}
          following={userData.following.length}
        />
      </div>
    </StyledProfileInfoContainer>
  );
};

export default ProfileInfo;
