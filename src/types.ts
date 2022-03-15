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

export interface User {
  userId: string,
  wallet: Wallet
}

export interface Wallet {
  balance: number,
  cards: WalletCard[],
  categories: string[],
  dates: string[]
}


export interface WalletCard {
  amount: number,
  category: string,
  date: string,
  isIncome: boolean,
  userId: string
}

