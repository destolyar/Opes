import moment from "moment"
import { useState } from "react"
import FirestoreActions from "../../firebase"
import { AddWalletCardFormProps } from "../../types"
import Utils from "../../Utils"

export const AddWalletCardForm: React.FunctionComponent<AddWalletCardFormProps> = (props) => {
  let [incomePicked, setIncomePicked] = useState<boolean>(false)
  let [expensPicked, setExpensPicked] = useState<boolean>(false)

  let [amount, setAmount] = useState<string | undefined>()
  let [category, setCategory] = useState<string | undefined>()
  let [date, setDate] = useState<string | undefined>()
  let [isIncome, setIsIncome] = useState<boolean | undefined>(undefined)

  let [error, setError] = useState<boolean>(false)

  const userId: string = localStorage.getItem('id') || ''
  const db: FirestoreActions = new FirestoreActions(userId);

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

  const addCard = () => {
    db.addWalletCard(
      { amount: Number(amount),
        category: category,
        date: date,
        dateAdded: `${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
        docId: "",
        isIncome: !isIncome,
        userId: userId 
      })
    props.getCards()
    props.hideAddCardFrom()
  }

  return(
    <div className='wallets__add-data-window-container__form'>
      <input className='wallets__add-data-window-container__form__amount' type="number" placeholder="Amount" onChange={(e) => {
        setAmount(e.target.value)
        }}/>
      <input className='wallets__add-data-window-container__form__category' type="text" placeholder="Category" onChange={(e) => {
        setCategory(e.target.value)
        }}/>
      <input className='wallets__add-data-window-container__form__date' type="date" onChange={(e) => {
        setDate(e.target.value)
        }}/>
      <div className='wallets__add-data-window-container__form__collection-expenses'>
        <button className='wallets__add-data-window-container__form__collection-expenses__income' style={(incomePicked) ?
        {backgroundColor: 'rgba(109,95,253, 0.5)'} : {backgroundColor: 'rgb(253, 60, 60)'}} 
        onClick={(e) => changeExpensButtonBackground(e)}>Expens</button>
        <button className='wallets__add-data-window-container__form__collection-expenses__expens' style={(expensPicked) ?
        {backgroundColor: 'rgba(109,95,253, 0.5)'} : {backgroundColor: 'rgb(12, 202, 12)'}}
        onClick={(e) => changeIncomeButtonBackground(e)}>Income</button>
      </div>
      <p className="wallets__add-data-window-container__form__error" style={(error) ? {display: "block"} : {display: "none"}}>Incorrect data</p>
      <button className="wallets__add-data-window-container__form__confirm" onClick={() => 
      {
        (Utils.getWalletCardInfoValid(Number(amount), category, date)) ? addCard() : setError(true)
      }}>Add</button>
  </div>
  )
}