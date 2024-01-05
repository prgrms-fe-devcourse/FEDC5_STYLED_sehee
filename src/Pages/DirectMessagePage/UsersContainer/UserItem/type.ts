import { ReactNode } from 'react';

export interface UserItemProps {
  imageUrl?: string;
  userName: string;
  body?: string;
  children?: ReactNode;
}
