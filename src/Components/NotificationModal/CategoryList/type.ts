import { CategoryType } from '../type';

export interface Props {
  list: CategoryType[];
  selectedCategory: CategoryType;
  setCategory: (categorY: CategoryType) => void;
}
