import Avatar from '@/Components/Base/Avatar';
import Button from '@/Components/Base/Button';
import { UserType } from '@/Types/UserType';

const ProfileInfo = ({ user }: UserType) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'left',
        textAlign: 'center',
        padding: '5rem 13rem 4rem 26%',
      }}
    >
      <Avatar
        src={user.image}
        size={140}
      />
      <div>
        <div
          style={{
            display: 'flex',
            marginTop: '4rem',
          }}
        >
          <div
            style={{
              fontSize: '2.7rem',
              padding: '0 6rem 0 3rem',
            }}
          >
            {user.fullName}
          </div>
          <Button
            type="button"
            height="3rem"
            textSize="1.4rem"
            width="7rem"
            key="login"
            borderRadius="1rem"
            style={{ marginRight: '1rem', marginTop: '.5rem' }}
          >
            팔로우
          </Button>
          <Button
            type="button"
            height="3rem"
            textSize="1.4rem"
            width="10rem"
            key="login"
            borderRadius="1rem"
            style={{ marginRight: '1rem', marginTop: '.5rem' }}
          >
            메시지 보내기
          </Button>
        </div>
        <div style={{ float: 'left', padding: '2rem 3rem 0' }}>
          <span style={{ fontSize: '1.4rem', marginRight: '1rem' }}>
            게시물 {user.posts.length}
          </span>
          <button type="button">
            <span style={{ fontSize: '1.4rem', marginRight: '1rem' }}>
              팔로워 {user.followers.length}
            </span>
          </button>
          <button type="button">
            <span style={{ fontSize: '1.4rem', marginRight: '1rem' }}>
              팔로잉 {user.following.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
