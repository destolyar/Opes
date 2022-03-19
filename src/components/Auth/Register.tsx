import '../../styles/components/auth.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from './Form';
import { animated, useSpring } from 'react-spring';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser } from '../../app/slices/userSlice'
import { setLogIn } from '../../app/slices/authSlice';
import { useState } from 'react';
import { authAnimationSettings } from '../../animationsSettings';

export const Register: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let [errorText, setErrorText] = useState<string>('');

  const handleRegister = (email: string, password: string): void => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(
          setUser({
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
      .catch(() => {setErrorText(errorText = "Something went wrong. Please try again.")})
  }

  const textDisplay = useSpring(authAnimationSettings)

  return(
    <section className='register'>
      {<animated.h1 style={textDisplay}>
        <h1 className='register__title'>The love of money increases 
          as wealth itself increases (Juvenalis)</h1>
      </animated.h1>}
      
      <Form title="register" handleClick={handleRegister}/>

      <p className='login__error'>{errorText}</p>
      
      <p className='register__text'>Already have account?
        <Link className='register__text__link' to="/login"> Login</Link>
      </p>
    </section>
  )
}