import { useState } from 'react';
import Avatar from '@/Components/Base/Avatar';
import FollowInfo from './FollowInfo';
import { StyledAvatar, StyledHover, StyledProfileInfoContainer } from './style';
import MyProfileInfo from './MyProfileInfo';
import UserProfileInfo from './UserProfileInfo';
import { Props } from './type';
import UpdateImageModal from '../UpdateImageModal';

const ProfileInfo = ({ userData, isMyProfile, isFollowing }: Props) => {
  const [isChangeImage, setIsChangeImage] = useState(false);

  return (
    <>
      <StyledProfileInfoContainer>
        {isMyProfile ? (
          <div>
            <StyledHover className="changeImage">
              프로필 이미지 변경하기
            </StyledHover>
            <StyledAvatar
              src={userData.image}
              size={140}
              style={{ cursor: 'pointer' }}
              onClick={() => setIsChangeImage(true)}
            />
          </div>
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
            posts={userData.posts.length}
            followers={userData.followers.length}
            following={userData.following.length}
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
