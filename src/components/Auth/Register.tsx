import '../../styles/components/register.scss';
import { Link } from 'react-router-dom';
import { Form } from './Form';
import { animated, useSpring } from 'react-spring';

export const Register: React.FunctionComponent = () => {
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
      

      <Form/>
      <button className='register__button' type='submit'>Sign up</button>
      <p className='register__text'>Already have account?
        <Link className='register__text__link' to="/Login"> Login</Link>
      </p>
    </section>
  )
}