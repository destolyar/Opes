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
  docId: string,
  userId?: string
}

export interface WalletCardInfoProps {
  info: WalletCardInfo,
  setAllWalletCardsAnimationOn?: Dispatch<SetStateAction<boolean>>,
  getCards: () => any
}

export interface AllWalletCardsProps {
  cards: WalletCardInfo[],
  historyDisplay: boolean,
  setHistoryDisplay: Dispatch<SetStateAction<boolean>>,
  getCards: () => any
}

export interface AddWalletModalProps {
  formDisplay: boolean,
  hideAddCardFrom: () => void,
  getCards: () => any
}

export interface AddWalletCardFormProps {
  getCards: () => any,
  hideAddCardFrom: () => void,
}
