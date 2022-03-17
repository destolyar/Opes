import { animated, useSpring } from "react-spring";
import { WalletCard } from './WalletCard';
import { AllWalletCardsProps } from "../../types"

export const AllWalletCards: React.FunctionComponent<AllWalletCardsProps> = (props) => {
  const formDisplayAnimation = useSpring({
    reset: false,
    to: { opacity: 1, transform: 'translateX(0)'},
    from: {opacity: 0, transform: 'translateX(100%)'},
    config: {
      duration: 500}
  });

  
  return(
    <animated.section style={(props.historyDisplay) ? formDisplayAnimation : {display: 'none'}} className="wallets__history__container">
      <div className="wallets__history__container__close-container" onClick={() => props.setHistoryDisplay(false)}>
        <div className="wallets__history__container__close-container__close">
          <div className="wallets__history__container__close-container__close__first-line"></div>
          <div className="wallets__history__container__close-container__close__second-line"></div>
        </div>
      </div>
      <h1 className="wallets__history__container__title">All Items</h1>
      <div className="wallets__history__container__items">
        {props.cards.map((i) => {return <WalletCard info={i} setCards={props.setCards} setLastTenCards={props.setLastTenCards}/>})}
      </div>
    </animated.section>
  )
}