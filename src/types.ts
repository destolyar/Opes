export interface userSliceState {
  email: string | null,
  token: string | null,
  id: string | null;
}

export interface authSliceState {
  isAuth: boolean;
}

export interface RootState {
  user: userSliceState;
  auth: authSliceState
}

export interface FormProps {
  title: string,
  handleClick: (email: string, password: string) => void
}