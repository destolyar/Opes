import '../../styles/components/wallets.scss'
import Utils from '../../Utils'
import { useState } from 'react'
import { AddWalletCard } from './AddWalletCard'
import FirestoreActions from '../../firebase'

export const Wallets: React.FunctionComponent = () => {
  let partOfDay: string | undefined = Utils.getPartOfDay()

  let [formDisplay, setFormDisplay] = useState<boolean>(false)

  const userId: string = localStorage.getItem('id') || ''
  const db: FirestoreActions = new FirestoreActions(userId);

  db.getWalletCards()
  
  return(
    <section className="wallets">
      <div className='wallets__history'>
        <h1 className='wallets__history__title'>Good {partOfDay}!</h1>
        <button className='wallets__history__button'><img src="./icons/history.png" alt="" /></button>
      </div>
      <div className='wallets__balance'>
        <h1>123124</h1>  
      </div>
      <div className='wallets__last-transactions'>

      </div>
      <AddWalletCard formDisplay={formDisplay} changeFormDisplay={setFormDisplay}/>
      <button className='wallets__add-data-button' onClick={() => setFormDisplay(true)}>
        <div className='wallets__add-data-button__plus'>
          <div className='wallets__add-data-button__plus__vertical-line'></div>
          <div className='wallets__add-data-button__plus__horizontal-line'></div>
        </div>
      </button>
    </section>
  )
}