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
  changeFormDisplay: Dispatch<SetStateAction<boolean>>,
  setLastTenCards: Dispatch<SetStateAction<WalletCardInfo[]>>,
  setCards: Dispatch<SetStateAction<WalletCardInfo[]>>,
}

export interface User {
  userId: string,
  wallet: Wallet
}

export interface Wallet {
  balance: number,
  cards: WalletCardInfo[],
  categories: string[],
  dates: string[]
}

export interface WalletCardInfo {
  amount: number | undefined,
  category: string | undefined,
  date: string | undefined,
  dateAdded: string,
  isIncome: boolean | undefined,
  userId?: string
}

export interface WalletCardInfoProps {
  info: WalletCardInfo
}

export interface AllWalletCardsProps {
  historyDisplay: boolean,
  setHistoryDisplay: Dispatch<SetStateAction<boolean>>
}
