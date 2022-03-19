import { Link, Outlet } from 'react-router-dom';
import { useNavbarDisplay } from '../app/hooks';
import { animated, useSpring } from 'react-spring';
import '../styles/layout.scss'

export const Layout: React.FunctionComponent = () => {
  let navbarShow: boolean = useNavbarDisplay()

  const navbarDisplay = useSpring({
    to: { opacity: 1, translateX: "0%" },
    from: { opacity: 0, translateX: "100%" },
    config: {duration: 1000}
  })

  return(
    <div className='layout'>
      
      <Outlet />

      {(navbarShow) ?
      <animated.nav style={navbarDisplay} className='layout__navbar'>
        <Link className='layout__navbar__item' to="/">
          <img src="./icons/house.png" alt="" />  
        </Link>
        <Link className='layout__navbar__item' to="/stocks">
          <img src="./icons/stocks.png" alt="" />
        </Link>
        <Link className='layout__navbar__item' to="/wallet">
          <img src="./icons/wallet.png" alt="" /></Link>
        <Link className='layout__navbar__item' to="/passive">
          <img src="./icons/car.png" alt="" />
        </Link>
     </animated.nav> :

      <footer className='layout__footer'>
        <a className='layout__footer__author' 
        href='https://github.com/destolyar' 
        target="_blank">
          Developed by Metik Vladislav in 2022
        </a>
      </footer>}
    </div>
  )
}