import { animated, useSpring } from "react-spring";
import { WalletCard } from './WalletCard';
import { AllWalletCardsProps, historyContext } from "../../types"
import { useContext, useState } from "react";
import { allWalletCardsAnimationSettings } from "../../animationsSettings";
import { HistoryContext } from "../../context/context";

export const AllWalletCards: React.FunctionComponent<AllWalletCardsProps> = (props) => {

  let [windowAnimationOn, setAllWalletCardsAnimationOn] = useState<boolean>(true)
  
  const formDisplayAnimation = useSpring(allWalletCardsAnimationSettings(windowAnimationOn));
  const history: historyContext = useContext(HistoryContext)

  const historyDisplay = () => {
    history.setHistoryDisplay(false)
    setAllWalletCardsAnimationOn(true)
  }
  
  return(
    <animated.section style={(history.historyDisplay) ? formDisplayAnimation : {display: 'none'}} className="wallets__history__container">
      <div className="wallets__history__container__close-container" onClick={() => historyDisplay()}>
        <div className="wallets__history__container__close-container__close">
          <div className="wallets__history__container__close-container__close__first-line"></div>
          <div className="wallets__history__container__close-container__close__second-line"></div>
        </div>
      </div>
      <h1 className="wallets__history__container__title">All Items</h1>
      <div className="wallets__history__container__items">
        {props.cards.map((i) => {return <WalletCard info={i} getCards={props.getCards} setAllWalletCardsAnimationOn={setAllWalletCardsAnimationOn} key={i.docId}/>})}
      </div>
    </animated.section>
  )
}
