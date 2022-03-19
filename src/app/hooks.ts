import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../types';


export const useAuth = () =>{
  const userAuth: boolean = useSelector((state: RootState) => state.auth.isAuth);

  if(localStorage.getItem("isAuth") === 'true'){
    return true;
  }
  return userAuth;
}

export const useNavbarDisplay = () => {
  const currentPath: string = useLocation().pathname
  if(currentPath === '/login' || (currentPath === '/register')) {
    return false
  }
  return true
}
