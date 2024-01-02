import { styled } from 'styled-components';
import { lightTheme } from '@/Styles/Theme';

export const StyledPostCardWrapper = styled.div<{
  width: string;
  fontSize?: string;
}>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  min-width: 15rem;
  border: 1px solid ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${(props) => props.fontSize};
`;

export const StyledPostCardHeader = styled.div`
  padding: 1rem;
  display: flex;
  border-radius: 0.5rem 0.5rem 0 0;
  justify-content: space-between;
`;

export const StyledProfileContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const StyledProfileAvatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

export const StyledProfileName = styled.span`
  font-weight: 700;
  cursor: pointer;
`;

export const StyledProfileFollowBtn = styled.button<{ $isFollower: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.$isFollower
      ? ({ theme }) => theme.colors.read
      : ({ theme }) => theme.colors.follow};
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: 1rem;

  &:hover {
    background-color: ${(props) =>
      props.$isFollower ? 'rgba(0, 149, 246, 0.7)' : 'rgba(119, 82, 254, 0.7)'};
  }
`;

export const HeartIconStyle = {
  color: `${lightTheme.colors.alert}`,
  cursor: 'pointer',
};

export const StyledPostCardTitle = styled.div`
  padding-left: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledPostCardBody = styled.div`
  width: 100%;
  height: 50%;
  border-radius: 0 0 0.5rem 0.5rem;
  flex-grow: 1;
`;

export const StyledPostCardImage = styled.img<{
  $objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}>`
  width: 100%;
  height: 100%;
  border-radius: 0 0 0.5rem 0.5rem;
  object-fit: ${(props) => props.$objectFit};
`;
