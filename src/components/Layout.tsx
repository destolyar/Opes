import { Link, Outlet } from 'react-router-dom';
import '../styles/layout.scss'

export const Layout: React.FunctionComponent = () => {
  return(
    <div className='layout'>
      <header>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </header>
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