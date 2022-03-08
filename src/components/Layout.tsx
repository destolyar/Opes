import { Link, Outlet } from 'react-router-dom';
import '../styles/layout.scss'

export const Layout: React.FunctionComponent = () => {
  return(
    <div className='layout'>     
      <Outlet />

      <footer className='layout__footer'>
        <a className='layout__footer__author' 
        href='https://github.com/destolyar' 
        target="_blank">
          Developed by Metik Vladislav in 2022
        </a>
      </footer>
    </div>
  )
}