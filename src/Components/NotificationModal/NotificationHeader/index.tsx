import styled, { useTheme } from 'styled-components';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import { useDarkModeStore } from '@/Stores';
import { Props } from './type';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.size.large};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.size.extraLarge};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.colors.text};
  user-select: none;
`;

const NotificationHeader = ({ onClose }: Props) => {
  const { isDarkMode } = useDarkModeStore();
  const { size, colors } = useTheme();

  return (
    <StyledHeader>
      <Title>알림</Title>
      <Button
        width="auto"
        height="auto"
        backgroundColor="transparent"
        hoverBackgroundColor="transparent"
        onClick={onClose}
      >
        <Icon
          name="cancel"
          isFill={!!isDarkMode}
          style={{ color: colors.text, fontSize: size.doubleLarge }}
        />
      </Button>
    </StyledHeader>
  );
};

export default NotificationHeader;
