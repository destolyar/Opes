import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { setLogIn } from '../../app/slices/authSlice';
import { removeUser } from '../../app/slices/userSlice';
import '../../styles/components/home.scss'

export const Home: React.FunctionComponent = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  
  return(
    <section className="home">
      <h1>Home(in progress)</h1>
      <button onClick={() => {
        localStorage.clear();
        dispatch(removeUser())
        dispatch(setLogIn({
          isAuth: false
        }))
        navigate('/')
        window.location.reload()
      }}>Log out</button>
    </section>
  )
}