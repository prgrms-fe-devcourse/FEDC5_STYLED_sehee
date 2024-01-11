import { Props } from './type';
import MyProfilePost from './MyProfilePost';
import UserProfilePost from './UserProfilePost';

const ProfilePost = ({ userData, myprofile }: Props) => {
  return (
    <div>
      {myprofile ? (
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
