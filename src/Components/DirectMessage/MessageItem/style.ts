import { styled } from 'styled-components';
import { bounce } from '@/Styles/Animation';

export const StyledMessageItem = styled.div`
  display: inline-block;
  width: max-content;
  height: min-content;
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.size.medium};
  padding: 1rem 1.5rem 1rem 1.5rem;
  border-radius: 2rem;
  word-break: break-all;

  // 메세지 보낼 때마다 움직이는 애니메이션
  transform: scale(0);
  transform-origin: 0 0;
  animation: ${bounce} 500ms linear both;
`;

export const StyledMessageWrapper = styled.div<{
  $myId: string;
  $senderId: string;
}>`
  max-width: 80%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: ${(props) =>
    props.$senderId === props.$myId ? 'auto' : undefined};
`;

export const StyledTime = styled.div`
  color: darkgrey;
  font-size: 0.7rem;
`;

export const StyledDate = styled.div`
  display: flex;
  justify-content: center;
  color: darkgrey;
`;
