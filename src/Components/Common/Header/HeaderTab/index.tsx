import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import PostModal from '../../Modal/PostModal';
import SearchModal from '../../Modal/SearchModal';

const HeaderTab = () => {
  const [tab, setTab] = useState(0);
  const [post, setPost] = useState(false);
  const [search, setSearch] = useState(false);

  const { colors } = useTheme();

  const menuArr = [
    { name: 'home', isFill: false },
    { name: 'add_circle', isFill: false },
    { name: 'search', isFill: true },
  ];

  const selectMenuHandler = (index: number) => {
    setTab(index);
  };

  const styledNavIcon = { fontSize: '4.5rem', padding: '1.5rem' };

  return (
    <>
      {menuArr.map((items, index) => (
        <Button
          backgroundColor="transparent"
          width="fit-content"
          type="button"
          borderRadius="0"
          key={Number(index)}
          style={
            index === tab
              ? {
                  height: '100%',
                  borderBottom: `3px solid ${colors.primary}`,
                }
              : { height: '100%' }
          }
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
          {items.name === 'add_circle'
            ? post && (
                <PostModal
                  onChangeOpen={() => {
                    setPost(false);
                    setTab(0);
                  }}
                />
              )
            : search && (
                <SearchModal
                  onChangeOpen={() => {
                    setSearch(false);
                    setTab(0);
                  }}
                />
              )}
        </Button>
      ))}
    </>
  );
};

export default HeaderTab;
