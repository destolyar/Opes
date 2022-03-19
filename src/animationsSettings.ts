import { useSpring } from "react-spring"

export const allWalletCardsAnimationSettings = (modalStatus: boolean) => {
  return {
    reset: modalStatus,
    to: { opacity: 1, transform: 'translateX(0)'},
    from: {opacity: 0, transform: 'translateX(100%)'},
    config: {
      duration: 500}
  }
}

export const authAnimationSettings = {
  to: { opacity: 1 },
  from: { opacity: 0 },
  config: {duration: 5000}
}