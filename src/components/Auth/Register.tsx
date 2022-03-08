import '../../styles/components/register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from './Form';
import { animated, useSpring } from 'react-spring';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser } from '../../app/slices/userSlice'
import { setLogIn } from '../../app/slices/authSlice';

export const Register: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
        navigate('/')
      })
      .catch((e) => console.log(e))
  }

  const textDisplay = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: {duration: 5000}
  })

  return(
    <section className='register'>
      {<animated.h1 style={textDisplay}>
        <h1 className='register__title'>The love of money increases 
          as wealth itself increases (Juvenalis)</h1>
      </animated.h1>}
      

      <Form title="register" handleClick={handleRegister}/>

      <p className='register__text'>Already have account?
        <Link className='register__text__link' to="/login"> Login</Link>
      </p>
    </section>
  )
}