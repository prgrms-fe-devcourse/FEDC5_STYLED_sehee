import { useState } from 'react';
import Avatar from '@/Components/Base/Avatar';
import FollowInfo from './FollowInfo';
import { StyledProfileInfoContainer } from './style';
import MyProfileInfo from './MyProfileInfo';
import UserProfileInfo from './UserProfileInfo';
import { Props } from './type';
import UpdateImageModal from '../UpdateImageModal';

const ProfileInfo = ({
  userData,
  userDataRefetch,
  isMyProfile,
  isFollowing,
}: Props) => {
  const [isChangeImage, setIsChangeImage] = useState(false);

  return (
    <>
      <StyledProfileInfoContainer>
        {isMyProfile ? (
          <Avatar
            src={userData.image}
            size={140}
            style={{ cursor: 'pointer' }}
            onClick={() => setIsChangeImage(true)}
          />
        ) : (
          <Avatar
            src={userData.image}
            size={140}
          />
        )}
        <div>
          {isMyProfile ? (
            <MyProfileInfo
              name={userData.fullName}
              // eslint-disable-next-line no-underscore-dangle
              id={userData._id}
            />
          ) : (
            <UserProfileInfo
              name={userData.fullName}
              user={userData}
              isFollowing={isFollowing}
            />
          )}
          <FollowInfo
            userData={userData}
            userDataRefetch={userDataRefetch}
          />
        </div>
      </StyledProfileInfoContainer>
      {isChangeImage && (
        <UpdateImageModal handleCloseModal={() => setIsChangeImage(false)} />
      )}
    </>
  );
};

export default ProfileInfo;
