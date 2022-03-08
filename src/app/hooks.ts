import { useSelector } from 'react-redux';
import { RootState } from '../types';


export function useAuth(){
  const userAuth: boolean = useSelector((state: RootState) => state.auth.isAuth);
  console.log(userAuth)
  return userAuth;
}
