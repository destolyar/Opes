import { useState } from "react";
import { WalletCardInfo, WalletCardInfoProps } from "../../types"

export const WalletCard: React.FunctionComponent<WalletCardInfoProps> = (props) => {
  const background: string = (props.info.isIncome) ? "rgba(12, 202, 12, 0.5)" : "rgba(253, 60, 60, 0.5)"

  const plus: string = (props.info.isIncome) ? "+" : "-";
  let [opacity, setOpacity] = useState('0'); 

  return(
    <div className="wallets__last-transactions__card" style={{backgroundColor: background}} onMouseOver={() => setOpacity('1')} onMouseOut={() => setOpacity('0')}>
      <div className="wallets__last-transactions__card__delete-container" style={{
        backgroundColor: background,
        opacity: opacity
      }}>
        <p className="wallets__last-transactions__card__delete-container__text">Delete Card?</p>
        <button className="wallets__last-transactions__card__delete-container__button">Yes</button>
      </div>
      <div className="wallets__last-transactions__card__amount">
        <p className="wallets__last-transactions__card__amount__text">{plus + props.info.amount}$</p>
      </div>
      <div className="wallets__last-transactions__card__info">
        <p className="wallets__last-transactions__card__info__text">date: {props.info.date}</p>
        <p className="wallets__last-transactions__card__info__text">category: {props.info.category}</p>
      </div>
    </div>
  )
}