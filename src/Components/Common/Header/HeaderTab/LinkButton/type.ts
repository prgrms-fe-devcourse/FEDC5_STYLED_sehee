interface Props {
  color: string;
  name: string;
  link: string;
  setLink?: () => void;
  style: object;
  children?: React.ReactNode;
}

export default Props;
