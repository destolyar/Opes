import { animated, useSpring } from "react-spring";
import { WalletCard } from './WalletCard';
import { AllWalletCardsProps } from "../../types"
import { useState } from "react";

export const AllWalletCards: React.FunctionComponent<AllWalletCardsProps> = (props) => {

  let [allWalletCardsAnimationOn, setAllWalletCardsAnimationOn] = useState<boolean>(true)
  
  const formDisplayAnimation = useSpring({
    reset: allWalletCardsAnimationOn,
    to: { opacity: 1, transform: 'translateX(0)'},
    from: {opacity: 0, transform: 'translateX(100%)'},
    config: {
      duration: 500}
  });

  const historyDisplay = () => {
    props.setHistoryDisplay(false)
    setAllWalletCardsAnimationOn(true)
  }
  
  return(
    <animated.section style={(props.historyDisplay) ? formDisplayAnimation : {display: 'none'}} className="wallets__history__container">
      <div className="wallets__history__container__close-container" onClick={() => historyDisplay()}>
        <div className="wallets__history__container__close-container__close">
          <div className="wallets__history__container__close-container__close__first-line"></div>
          <div className="wallets__history__container__close-container__close__second-line"></div>
        </div>
      </div>
      <h1 className="wallets__history__container__title">All Items</h1>
      <div className="wallets__history__container__items">
        {props.cards.map((i) => {return <WalletCard info={i} 
        setCards={props.setCards} 
        setLastTenCards={props.setLastTenCards} 
        setAllWalletCardsAnimationOn={setAllWalletCardsAnimationOn} setBalance={props.setBalance} key={i.docId}/>})}
      </div>
    </animated.section>
  )
}