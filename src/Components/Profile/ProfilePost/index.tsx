import { Props } from './type';
import MyProfilePost from './MyProfilePost';
import UserProfilePost from './UserProfilePost';

const ProfilePost = ({ userData, isMyProfile }: Props) => {
  return (
    <div>
      {isMyProfile ? (
        <MyProfilePost
          posts={userData.posts}
          likes={userData.likes}
        />
      ) : (
        <UserProfilePost posts={userData.posts} />
      )}
    </div>
  );
};

export default ProfilePost;
