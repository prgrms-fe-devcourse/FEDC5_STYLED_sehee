import { useTheme } from 'styled-components';
import { Props } from './type';
import Button from '@/Components/Base/Button';
import StyledCategoryItem from './style';

const CategoryItem = ({ value, isActive, setCategory }: Props) => {
  const { size } = useTheme();

  const handleOnClick = () => {
    setCategory(value);
  };

  return (
    <StyledCategoryItem
      $isActive={isActive}
      onClick={handleOnClick}
    >
      <Button
        width="auto"
        height="auto"
        backgroundColor="transparent"
        hoverBackgroundColor="transparent"
        style={{ fontSize: size.medium, color: 'inherit' }}
      >
        {value}
      </Button>
    </StyledCategoryItem>
  );
};

export default CategoryItem;
