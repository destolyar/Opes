import '../../styles/components/wallets.scss'
import Utils from '../../Utils'
import FirestoreActions from '../../firebase'
import { useSelector } from 'react-redux'
import { RootState } from '../../types'
import { animated, useSpring } from 'react-spring';
import { useState } from 'react'

export const Wallets: React.FunctionComponent = () => {
  let partOfDay: string | undefined = Utils.getPartOfDay()
  const userId: string | null = useSelector((state: RootState) => state.user.id)
  const db: FirestoreActions = new FirestoreActions(userId);

  let [formDisplayShow, setFormDisplayShow] = useState(false)

  const formDisplayAnimation = useSpring({
    to: { opacity: 1, transform: 'translateY(0)'},
    from: {opacity: 0, transform: 'translateY(-100%)'},
    config: {duration: 2000}
  })
  
  return(
    <section className="wallets">
      <div className='wallets__history'>
        <h1 className='wallets__history__title'>Good {partOfDay}!</h1>
        <button className='wallets__history__button'><img src="./icons/history.png" alt="" /></button>
      </div>
      <div className='wallets__balance'>
        <h1>123124</h1>  
      </div>

      <animated.div style={(formDisplayShow) ? formDisplayAnimation : {}} className='wallets__add-data-window-container' onClick={(e) => {
        const target = e.target as HTMLTextAreaElement;

        (target.className.toString() === 'wallets__add-data-window-container__form') ? setFormDisplayShow(formDisplayShow = false) : setFormDisplayShow(formDisplayShow = true)}}>
        <div className='wallets__add-data-window-container__form'>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <button onClick={() => db.addCard( 1, '', '', false)}></button>
        </div>
      </animated.div>

      <button className='wallets__add-data-button' onClick={() => setFormDisplayShow(true)}>
        <div className='wallets__add-data-button__plus'>
          <div className='wallets__add-data-button__plus__vertical-line'></div>
          <div className='wallets__add-data-button__plus__horizontal-line'></div>
        </div>
      </button>
    </section>
  )
}