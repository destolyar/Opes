import '../../styles/components/wallets.scss'
import Utils from '../../Utils'
import { useContext, useEffect, useState } from 'react'
import { AddWalletCard } from './AddWalletCard'
import { AllWalletCards } from './AllWalletCards'
import FirestoreActions from '../../firebase'
import { formContext, historyContext, WalletCardInfo } from '../../types'
import { WalletCard } from './WalletCard'
import { FormContext, HistoryContext } from '../../context/context'

export const Wallet: React.FunctionComponent = () => {
  let partOfDay: string | undefined = Utils.getPartOfDay();
  let [balance, setBalance] = useState<number>(0)
  let [cards, setCards] = useState<WalletCardInfo[]>([]);
  let [lastTenCards, setLastTenCards] = useState<WalletCardInfo[]>([])

  const form: formContext = useContext(FormContext)
  const history: historyContext = useContext(HistoryContext)

  const userId: string = localStorage.getItem('id') || '';
  const db: FirestoreActions = new FirestoreActions(userId);

  const getCards = async (): Promise<void> => {
    cards = await db.getWalletCards();
    setCards(Utils.sortByDate(cards))
    setLastTenCards(lastTenCards = cards.reverse().slice(0, 9))
    setBalance(Utils.getBalance(cards))
  }
  
  useEffect(() => {
    getCards()
  }, [])

  
  return(
    <section className="wallets">
      <div className='wallets__history'>
        <h1 className='wallets__history__title'>Good {partOfDay}!</h1>
        <button className='wallets__history__button' onClick={() =>  history.setHistoryDisplay(true)}>
          <img src="./icons/history.png" alt=""/>
        </button>
      </div>
      <div className='wallets__balance'>
        <h1 className='wallets__balance__value'>Balance: {balance}$</h1>
      </div>
      <div className='wallets__last-transactions'>
        {""}
        {lastTenCards.map((i) => {return <WalletCard info={i} getCards={getCards} key={i.docId}/>})}
      </div>
      
      {""}
      
      <AllWalletCards cards={cards} getCards={getCards}/>

      <AddWalletCard getCards={getCards}/>

      <button className='wallets__add-data-button' onClick={() => form.setFormDisplay(true)}>
        <div className='wallets__add-data-button__plus'>
          <div className='wallets__add-data-button__plus__vertical-line'></div>
          <div className='wallets__add-data-button__plus__horizontal-line'></div>
        </div>
      </button>
    </section>
  )
}