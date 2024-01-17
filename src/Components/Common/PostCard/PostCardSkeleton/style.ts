import { styled } from 'styled-components';

export const StyledPostCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 45rem;
  min-width: 15rem;
  border: 1px solid ${({ theme }) => theme.colors.backgroundGrey};
  border-radius: 2.5rem;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.backgroundReverse};
  color: ${({ theme }) => theme.colors.textReverse};
  padding: 2rem;
  gap: 2rem;
  flex-shrink: 0;

  > :nth-child(2) {
    width: 90%;
    margin: 0 2%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    > :last-child {
      width: 50%;
    }
  }
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
