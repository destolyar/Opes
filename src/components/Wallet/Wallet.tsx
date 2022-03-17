import '../../styles/components/wallets.scss'
import Utils from '../../Utils'
import { useEffect, useState } from 'react'
import { AddWalletCard } from './AddWalletCard'
import { AllWalletCards } from './AllWalletCards'
import FirestoreActions from '../../firebase'
import { WalletCardInfo } from '../../types'
import { WalletCard } from './WalletCard'

export const Wallet: React.FunctionComponent = () => {
  let partOfDay: string | undefined = Utils.getPartOfDay();

  let [formDisplay, setFormDisplay] = useState<boolean>(false);
  let [historyDisplay, setHistoryDisplay] = useState<boolean>(false);
  let [balance, setBalance] = useState<number>(0)
  let [cards, setCards] = useState<WalletCardInfo[]>([]);
  let [lastTenCards, setLastTenCards] = useState<WalletCardInfo[]>([])

  const userId: string = localStorage.getItem('id') || '';
  const db: FirestoreActions = new FirestoreActions(userId);

  useEffect(() => {
    const getCards = async () => {
      cards = await db.getWalletCards();
      setCards(Utils.sortByDate(cards))
      setLastTenCards(lastTenCards = cards.reverse().slice(0, 9))
      setBalance(Utils.getBalance(cards))
    }
    getCards()
  }, [])

  
  return(
    <section className="wallets">
      <div className='wallets__history'>
        <h1 className='wallets__history__title'>Good {partOfDay}!</h1>
        <button className='wallets__history__button' onClick={() => setHistoryDisplay(true)}>
          <img src="./icons/history.png" alt=""/>
        </button>
      </div>
      <div className='wallets__balance'>
        <h1 className='wallets__balance__value'>Balance: {balance}$</h1>
      </div>
      <div className='wallets__last-transactions'>
        {lastTenCards.map((i) => {return <WalletCard info={i} setCards={setCards} setLastTenCards={setLastTenCards} key={i.docId} setBalance={setBalance}/>})}
      </div>
      <AllWalletCards historyDisplay={historyDisplay} setHistoryDisplay={setHistoryDisplay} cards={cards} setCards={setCards} 
      setLastTenCards={setLastTenCards} setBalance={setBalance}/>
      <AddWalletCard formDisplay={formDisplay} changeFormDisplay={setFormDisplay} setCards={setCards} setLastTenCards={setLastTenCards} setBalance={setBalance}/>
      <button className='wallets__add-data-button' onClick={() => setFormDisplay(true)}>
        <div className='wallets__add-data-button__plus'>
          <div className='wallets__add-data-button__plus__vertical-line'></div>
          <div className='wallets__add-data-button__plus__horizontal-line'></div>
        </div>
      </button>
    </section>
  )
}