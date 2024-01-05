import { useState } from 'react';
import AddButton from './AddButton';
import SearchButton from './SearchButton';
import HomeButton from './HomeButton';
import LoginButton from './LoginButton';
import AlarmButton from './AlarmButton';
import DirectMessageButton from './DirectMessageButton';
import AccountButton from './AccountButton';
import { StyledUserContainer } from './style';

const HeaderTab = () => {
  const [tab, setTab] = useState(0);
  const [isAuthUser, setIsAuthUser] = useState(false);

  const selectMenuHandler = (index: number) => {
    setTab(index);
    console.log(tab);
  };

  const styledNavIcon = { fontSize: '4.5rem', padding: '1.5rem' };

  return (
    <StyledUserContainer>
      <HomeButton style={styledNavIcon} />
      <AddButton style={styledNavIcon} />
      <SearchButton style={styledNavIcon} />
      {!isAuthUser ? (
        <LoginButton onClick={() => setIsAuthUser(true)} />
      ) : (
        <>
          <AlarmButton style={styledNavIcon} />
          <DirectMessageButton style={styledNavIcon} />
          <AccountButton style={styledNavIcon} />
        </>
      )}
    </StyledUserContainer>
  );
};

export default HeaderTab;
