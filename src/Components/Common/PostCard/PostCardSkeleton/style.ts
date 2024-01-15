import { styled } from 'styled-components';

export const StyledPostCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  flex-shrink: 0;
  min-width: 15rem;
  border: 1px solid ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.size.small};
`;

export const StyledPostCardHeader = styled.div`
  padding: 1rem;
  display: flex;
  height: 10%;
  border-radius: 0.5rem 0.5rem 0 0;
  justify-content: space-between;
`;

export const StyledProfileContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  align-items: center;
`;

export const StyledPostCardBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  border-radius: 0 0 0.5rem 0.5rem;
  flex-grow: 1;
  cursor: pointer;
`;
