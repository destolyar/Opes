import { useState } from "react";
import { animated, useSpring } from "react-spring";
import Utils from "../../Utils";
import FirestoreActions from "../../firebase";
import { addWalletFormProps } from "../../types";
import moment from "moment";

export const AddWalletCard: React.FunctionComponent<addWalletFormProps> = (props) => {
  let [incomePicked, setIncomePicked] = useState<boolean>(false)
  let [expensPicked, setExpensPicked] = useState<boolean>(false)

  let [amount, setAmount] = useState<string | undefined>()
  let [category, setCategory] = useState<string | undefined>()
  let [date, setDate] = useState<string | undefined>()
  let [isIncome, setIsIncome] = useState<boolean | undefined>(undefined)

  let [error, setError] = useState<boolean>(false)

  const changeExpensButtonBackground = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if(!incomePicked) {
      e.currentTarget.style.backgroundColor = "rgba(109,95,253, 0.5)"
      setIncomePicked(incomePicked = true)
      setExpensPicked(expensPicked = false)
      setIsIncome(isIncome = true)
    }
  }

  const changeIncomeButtonBackground = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.currentTarget.style.backgroundColor = "rgba(109,95,253, 0.5)"
    setIncomePicked(incomePicked = false)
    setExpensPicked(expensPicked = true)
    setIsIncome(isIncome = false)
  }

  const getCards = async () => {
    const cards = await db.getWalletCards();
    props.setCards(cards)
    props.setLastTenCards(cards.reverse().slice(0, 9))
  }

  const addCard = () => {
    db.addWalletCard(
      { amount: Number(amount),
        category: category,
        date: date,
        dateAdded: `${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
        isIncome: !isIncome,
        userId: userId 
      })
    getCards()
  }

  const formDisplayAnimation = useSpring({
    reset: false,
    to: { opacity: 1, transform: 'translateY(0)'},
    from: {opacity: 0, transform: 'translateY(-100%)'},
    config: {
      duration: 500}
  });

  const userId: string = localStorage.getItem('id') || ''
  const db: FirestoreActions = new FirestoreActions(userId);
  
  return(
    <animated.div style={(props.formDisplay) ? formDisplayAnimation : {}} className='wallets__add-data-window-container' onClick={(e) => {
      const target = e.target as HTMLTextAreaElement;
      ((target.className.toString() === 'wallets__add-data-window-container')) ? props.changeFormDisplay(false) : props.changeFormDisplay(true)
      }}>
      <div className='wallets__add-data-window-container__form'>
        <input className='wallets__add-data-window-container__form__amount' type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)}/>
        <input className='wallets__add-data-window-container__form__category' type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)}/>
        <input className='wallets__add-data-window-container__form__date' type="date" onChange={(e) => setDate(e.target.value)}/>
        <div className='wallets__add-data-window-container__form__collection-expenses'>
          <button className='wallets__add-data-window-container__form__collection-expenses__income' style={(incomePicked) ? {backgroundColor: 'rgba(109,95,253, 0.5)'} : {backgroundColor: 'rgb(253, 60, 60)'}} 
          onClick={(e) => changeExpensButtonBackground(e)}>Expens</button>
          <button className='wallets__add-data-window-container__form__collection-expenses__expens' style={(expensPicked) ? {backgroundColor: 'rgba(109,95,253, 0.5)'} : {backgroundColor: 'rgb(12, 202, 12)'}}
          onClick={(e) => changeIncomeButtonBackground(e)}>Income</button>
        </div>
        <p className="wallets__add-data-window-container__form__error" style={(error) ? {display: "block"} : {display: "none"}}>Incorrect data</p>
        <button className="wallets__add-data-window-container__form__confirm" onClick={() => 
        {
          (Utils.getWalletCardInfoValid(Number(amount), category, date)) ? addCard() : setError(true)
        }}>Add</button>
      </div>
    </animated.div>
  )
}