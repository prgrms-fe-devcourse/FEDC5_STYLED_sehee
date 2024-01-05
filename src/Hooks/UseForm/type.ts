export type InitialState = Record<string, string | boolean>;
export type ErrorMessages = Record<string, string>;

export interface Props {
  initialState: InitialState;
  callback?: () => Promise<void> | void;
  validate: (values: InitialState) => ErrorMessages;
}
