export interface Props<T> {
  initialState: T;
  callback: () => void | Promise<unknown>;
  validate: (values: T) => Partial<T>;
}
