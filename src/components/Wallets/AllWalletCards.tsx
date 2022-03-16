import { animated, useSpring } from "react-spring";
import { AllWalletCardsProps } from "../../types"

export const AllWalletCards: React.FunctionComponent<AllWalletCardsProps> = (props) => {
  const formDisplayAnimation = useSpring({
    reset: true,
    to: { opacity: 1, transform: 'translateX(0)'},
    from: {opacity: 0, transform: 'translateX(100%)'},
    config: {
      duration: 500}
  });

  return(
    <animated.div style={(props.historyDisplay) ? formDisplayAnimation : {display: 'none'}} className="wallets__history__container">
      <div className="wallets__history__container__close" onClick={() => props.setHistoryDisplay(false)}>
        <div className="wallets__history__container__close__line"></div>
        <div className="wallets__history__container__close__line"></div>
      </div>
      <h1 className="wallets__history__container__title">All Items</h1>
      <div className="wallets__history__container__items">

      </div>
    </animated.div>
  )
}