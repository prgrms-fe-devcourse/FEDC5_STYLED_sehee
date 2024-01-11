import { styled } from 'styled-components';

export const MessageListContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 7rem;
  gap: 2rem;
  overflow: hidden;
`;

export const MessageListWrapper = styled.div`
  padding: 2rem 5rem 2rem 5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MessageListParagraphWrapper = styled.div<{ $isRight?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ $isRight }) => ($isRight ? 'flex-end' : '')};
`;

export const UserCardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const UserCardWrapper = styled.div`
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
