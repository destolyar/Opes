export interface userSliceState {
  email: string | null,
  token: string | null,
  id: string | null;
}

export interface RootState {
  user: userSliceState;
}