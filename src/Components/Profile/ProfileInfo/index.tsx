import { useState } from 'react';
import Avatar from '@/Components/Base/Avatar';
import FollowInfo from './FollowInfo';
import { StyledProfileInfoContainer } from './style';
import MyProfileInfo from './MyProfileInfo';
import UserProfileInfo from './UserProfileInfo';
import { Props } from './type';
import UpdateImageModal from '../UpdateImageModal';
import Skeleton from '@/Components/Base/Skeleton';

const ProfileInfo = ({
  userData,
  userDataRefetch,
  isMyProfile,
  isFollowing,
  isLoading,
}: Props) => {
  const [isChangeImage, setIsChangeImage] = useState(false);

  return (
    <>
      <StyledProfileInfoContainer>
        {isLoading && <Skeleton.Circle size="14rem" />}
        {!isLoading && isMyProfile ? (
          <Avatar
            src={userData.image}
            size={140}
            style={{ cursor: 'pointer', flexShrink: '0' }}
            onClick={() => setIsChangeImage(true)}
          />
        ) : (
          !isLoading && (
            <Avatar
              src={userData.image}
              size={140}
            />
          )
        )}
        <div>
          {isLoading && (
            <Skeleton.Paragraph
              line={1}
              height="3.5rem"
              style={{ marginTop: '4rem', marginLeft: '1rem' }}
            />
          )}
          {!isLoading && isMyProfile ? (
            <MyProfileInfo
              name={userData.fullName}
              // eslint-disable-next-line no-underscore-dangle
              id={userData._id}
            />
          ) : (
            !isLoading && (
              <UserProfileInfo
                name={userData.fullName}
                user={userData}
                isFollowing={isFollowing}
              />
            )
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
