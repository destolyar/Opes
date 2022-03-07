import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userSliceState } from "../types";
import { RootState } from '../types';


export function useAuth(){
  const {email, token, id}:userSliceState = useSelector((state: RootState) => state.user);

  return{
    isAuth: !!email,
    email,
    token,
    id
  }
}

