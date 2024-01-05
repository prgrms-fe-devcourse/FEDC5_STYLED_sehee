import { styled } from 'styled-components';

export const StyledMessageItem = styled.div`
  display: inline-block;
  width: max-content;
  height: min-content;
  background-color: ${({ theme }) => theme.colors.focusHover};
  padding: 1rem 1.5rem 1rem 1.5rem;
  border-radius: 2rem;
  word-break: break-all;
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
