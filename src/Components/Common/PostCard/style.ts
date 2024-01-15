import Icon from '@/Components/Base/Icon';
import { styled } from 'styled-components';

export const StyledPostCardWrapper = styled.div<{
  width: string;
  fontSize?: string;
}>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  height: 45rem;
  min-width: 15rem;
  border: 1px solid ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 2.5rem;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.backgroundReverse};
  color: ${({ theme }) => theme.colors.textReverse};
  font-size: ${(props) => props.fontSize};
  padding: 2rem;
  gap: 2rem;
  flex-shrink: 0;
`;

export const StyledPostCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledProfileContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: ${({ theme }) => theme.size.medium};
  color: ${({ theme }) => theme.colors.textReverse};
`;

export const StyledProfileAvatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

export const StyledProfileName = styled.span`
  cursor: pointer;
`;

export const HeartIconStyle = {
  cursor: 'pointer',
  display: 'flex',
};

export const StyledPostCardTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.size.medium};
`;

export const StyledPostCardBody = styled.div`
  width: 100%;
  height: 50%;
  border-radius: 0 0 2rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.backgroundReverse};

  /* TODO: 이미지 뒷 배경색 어떻게할지 */
  /* background-color: ${({ theme }) => theme.colors.gray}; */
  cursor: pointer;
`;

export const StyledPostCardImage = styled.img<{
  $objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}>`
  width: 100%;
  height: 100%;
  border-radius: 0 0 2.3rem 2.3rem;
  object-fit: ${(props) => props.$objectFit};
`;
