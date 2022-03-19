import '../../styles/components/auth.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from './Form';
import { animated, useSpring } from 'react-spring';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { setUser } from '../../app/slices/userSlice';
import { setLogIn } from '../../app/slices/authSlice';
import { useState } from 'react';
import { authAnimationSettings } from '../../animationsSettings';

export const Login: React.FunctionComponent = () => {
  let [errorText, setErrorText] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string): void => {
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(setUser({
          email: user.email,
          id: user.uid
        }));
        dispatch(setLogIn({
          isAuth: true
        }));

        localStorage.setItem("email", `${user.email}`)
        localStorage.setItem("id", `${user.uid}`)
        localStorage.setItem("isAuth", "true")

        navigate('/wallet')
      })
      .catch(() => {setErrorText(errorText = "Incorrect email or password")})
  }

  const textDisplay = useSpring(authAnimationSettings)

  return(
    <section className='login'>
      {<animated.h1 style={textDisplay}>
        <h1 className='login__title'>The love of money increases 
          as wealth itself increases (Juvenalis)</h1>
      </animated.h1>}
      
      <Form title="login" handleClick={handleLogin}/>

      <p className='login__error'>{errorText}</p>

      <p className='login__text'>Don't have an account yet?
        <Link className='login__text__link' to="/register"> Register</Link>
      </p>
    </section>
  )
}