import { useContext } from "react";
import { animated, useSpring } from "react-spring";
import { FormContext } from "../../context/context";
import { AddWalletModalProps, formContext } from "../../types";
import { AddWalletCardForm } from "./AddWalletCardForm";

export const AddWalletCard: React.FunctionComponent<AddWalletModalProps> = (props) => {
  const formDisplayAnimation = useSpring({
    reset: true,
    to: { opacity: 1, transform: 'translateY(0)'},
    from: {opacity: 0, transform: 'translateY(-100%)'},
    config: {
      duration: 500}
  });
  
  const form: formContext = useContext(FormContext)

  return(
    <animated.div style={(form.formDisplay) ? formDisplayAnimation : {}} className='wallets__add-data-window-container' onClick={(e) => {
      const target = e.target as HTMLTextAreaElement;
      if (target.className.toString() === 'wallets__add-data-window-container') form.setFormDisplay(false)
      }}>
      <AddWalletCardForm getCards={props.getCards}/>
    </animated.div>
  )
}