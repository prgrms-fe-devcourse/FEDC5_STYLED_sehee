import { useTheme } from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import profile from '@/Assets/Images/STYLED-logo-black.png';
import ProfileInfo from './ProfileInfo';
import ProfilePost from './ProfilePost';
import { checkAuth } from '@/Services/Auth';

/**
 * 
 * likes: LikeType[];
  comments: CommentType[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: ChannelType;
  author: UserType;
  createdAt: string;
  updatedAt: string;
 */

const ProfilePage = () => {
  const { colors } = useTheme();
  const { userId } = useParams(); // URL에서 사용자 ID를 가져옴
  const navigate = useNavigate();

  return (
    <>
      <div style={{ height: '9.4rem' }} />
      <div
        style={{
          backgroundColor: colors.background,
          height: '100%',
          textAlign: 'center',
        }}
      >
        <ProfileInfo
          userData={user}
          // eslint-disable-next-line no-underscore-dangle
          myprofile={userId === user._id}
        />
        <hr style={{ width: '75%' }} />
        <ProfilePost userData={user} />
      </div>
    </>
  );
};

export default ProfilePage;
