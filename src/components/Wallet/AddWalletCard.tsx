import { animated, useSpring } from "react-spring";
import { AddWalletModalProps } from "../../types";
import { AddWalletCardForm } from "./AddWalletCardForm";

export const AddWalletCard: React.FunctionComponent<AddWalletModalProps> = (props) => {
  const formDisplayAnimation = useSpring({
    reset: true,
    to: { opacity: 1, transform: 'translateY(0)'},
    from: {opacity: 0, transform: 'translateY(-100%)'},
    config: {
      duration: 500}
  });
  
  return(
    <animated.div style={(props.formDisplay) ? formDisplayAnimation : {}} className='wallets__add-data-window-container' onClick={(e) => {
      const target = e.target as HTMLTextAreaElement;
      if (target.className.toString() === 'wallets__add-data-window-container') props.hideAddCardFrom()
      }}>
      <AddWalletCardForm getCards={props.getCards} hideAddCardFrom={props.hideAddCardFrom}/>
    </animated.div>
  )
}