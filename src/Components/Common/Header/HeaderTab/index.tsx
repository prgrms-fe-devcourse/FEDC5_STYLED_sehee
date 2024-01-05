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
    <StyledContainer>
      {menuArr.map((items, index) => (
        <StyledButton
          backgroundColor="transparent"
          width="fit-content"
          type="button"
          hoverBackgroundColor="transparent"
          hoverTextColor="transparent"
          borderRadius="0"
          key={items.name}
          $tab={tab}
          $index={index}
          onClick={() => {
            selectMenuHandler(index);
            switch (items.name) {
              case 'add_circle':
                setPost(true);
                break;
              case 'search':
                setSearch(true);
                break;
              default:
                break;
            }
          }}
        >
          {items.name === 'home' ? (
            <Link to="/">
              <Icon
                name={items.name}
                isFill={items.isFill}
                style={styledNavIcon}
              />
            </Link>
          ) : (
            <Icon
              name={items.name}
              isFill={items.isFill}
              style={styledNavIcon}
            />
          )}
          {(() => {
            switch (items.name) {
              case 'add_circle':
                return (
                  post && (
                    <PostModal
                      onChangeOpen={() => {
                        setPost(false);
                        setTab(0);
                      }}
                    />
                  )
                );
              case 'search':
                return (
                  search && (
                    <SearchModal
                      onChangeOpen={() => {
                        setSearch(false);
                        setTab(0);
                      }}
                    />
                  )
                );
              default:
                return null;
            }
          })()}
        </StyledButton>
      ))}
    </StyledContainer>
  );
};

export default HeaderTab;
