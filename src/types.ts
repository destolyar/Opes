export interface userSliceState {
  email: string | null,
  token: string | null,
  id: string;
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

export interface WalletsCards {
  date: string,
  category: string,
  amount: number,
  isInput: boolean 
}

export interface Wallet {
  cards: WalletsCards[],
  categories: string[],
  dates: string[]
}

export interface User {
  userId: string,
  wallet: Wallet
}