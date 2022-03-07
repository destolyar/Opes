import '../../styles/components/login.scss';
import { Link } from 'react-router-dom';
import { Form } from './Form';
import { animated, useSpring } from 'react-spring';

export const Login: React.FunctionComponent = () => {
  const textDisplay = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: {duration: 5000}
  })

  return(
    <section className='login'>
      {<animated.h1 style={textDisplay}>
        <h1 className='login__title'>The love of money increases 
          as wealth itself increases (Juvenalis)</h1>
      </animated.h1>}
      

      <Form/>
      <button className='login__button'>Sign in</button>
      <p className='login__text'>Don't have an account yet?
        <Link className='login__text__link' to="/register"> Register</Link>
      </p>
    </section>
  )
}