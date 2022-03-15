export default class Utils {
  // 6 - 12 Morning
  // 12 - 18 Afternoon
  // 18 - 23 evening
  // 23 - 6 night

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
}