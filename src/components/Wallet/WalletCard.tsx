import { useState } from "react";
import FirestoreActions from "../../firebase";
import { WalletCardInfoProps } from "../../types"

export const WalletCard: React.FunctionComponent<WalletCardInfoProps> = (props) => {
  let [opacity, setOpacity] = useState('0'); 

  const styles = {
    backgroundColor: (props.info.isIncome) ? "rgba(12, 202, 12, 0.5)" : "rgba(253, 60, 60, 0.5)",
    opacity: opacity
  }
      
  const deleteCard = () => {
    const userId: string = localStorage.getItem('id') || '';
    const db: FirestoreActions = new FirestoreActions(userId);

    db.deleteCard(props.info.docId)
    if(props.setAllWalletCardsAnimationOn !== undefined) {
      props.setAllWalletCardsAnimationOn(false)
    }
    props.getCards()
  }

  return(
    <div className="wallets__last-transactions__card" 
    style={{backgroundColor: styles.backgroundColor}}
    onMouseOver={() => setOpacity('1')} 
    onMouseOut={() => setOpacity('0')}>
      <div className="wallets__last-transactions__card__delete-container" style={styles}>
        <p className="wallets__last-transactions__card__delete-container__text">Delete Card?</p>
        <button className="wallets__last-transactions__card__delete-container__button" onClick={() => deleteCard()} >Yes</button>
      </div>
      <div className="wallets__last-transactions__card__amount">
        <p className="wallets__last-transactions__card__amount__text">{`${props.info.isIncome ? "+" : "-"}`+ props.info.amount}$</p>
      </div>
      <div className="wallets__last-transactions__card__info">
        <p className="wallets__last-transactions__card__info__text">date: {props.info.date}</p>
        <p className="wallets__last-transactions__card__info__text">category: {props.info.category}</p>
      </div>
    </div>
  )
}