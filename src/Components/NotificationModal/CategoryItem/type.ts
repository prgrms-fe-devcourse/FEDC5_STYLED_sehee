import { CategoryType } from '../type';

export interface Props {
  value: CategoryType;
  isActive: boolean;
  setCategory: (category: CategoryType) => void;
}
