import { Props } from './type';
import CategoryItem from '../CategoryItem';
import StyledCategoryList from './style';

const CategoryList = ({ list, selectedCategory, setCategory }: Props) => {
  return (
    <StyledCategoryList>
      {list.map((item) => (
        <CategoryItem
          key={item}
          value={item}
          isActive={item === selectedCategory}
          setCategory={setCategory}
        />
      ))}
    </StyledCategoryList>
  );
};

export default CategoryList;
