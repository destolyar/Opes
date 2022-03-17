import { WalletCardInfo } from "./types";

export default class Utils {
  public static getPartOfDay() {
    let currentDate = new Date().getHours();
    
    if(currentDate >= 6 && currentDate < 12) {
      return 'Morning';
    } else if(currentDate === 12) {
      return 'Noon';
    } else if(currentDate > 12 && currentDate < 18) {
      return 'Afternoon';
    } else if(currentDate >= 18 && currentDate < 23) {
      return 'Evening';
    } else {
      return 'Night';
    }
  }

  public static getWalletCardInfoValid = (amount: number | undefined, category: string | undefined, date: string | undefined): boolean => {
    if(category === undefined || date === undefined || amount === undefined) {
      return false
    }
    return true
  }

  public static sortByDate(cards: WalletCardInfo[]) {
    //transform date string in number by which we sort the list

    cards.sort((a: WalletCardInfo, b: WalletCardInfo) => {
      return Number(b.date?.replace(/-/gi, '')) - Number(a.date?.replace(/-/gi, ''));
    })

    return cards;
  }
}