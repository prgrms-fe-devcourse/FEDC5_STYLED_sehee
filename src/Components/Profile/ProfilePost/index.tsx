import { Props } from './type';
import MyProfilePost from './MyProfilePost';
import UserProfilePost from './UserProfilePost';

const ProfilePost = ({ userData, isMyProfile, isLoading }: Props) => {
  return (
    <div>
      {isMyProfile ? (
        <MyProfilePost
          posts={userData.posts}
          likes={userData.likes}
          isLoading={isLoading}
        />
      ) : (
        <UserProfilePost
          posts={userData.posts}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ProfilePost;
