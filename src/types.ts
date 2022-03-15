import { Dispatch, SetStateAction } from "react";

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

export interface addWalletFormProps {
  formDisplay: boolean,
  changeFormDisplay: Dispatch<SetStateAction<boolean>>
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
  amount: number | undefined,
  category: string | undefined,
  date: string | undefined,
  isIncome: boolean | undefined,
  userId?: string
}

