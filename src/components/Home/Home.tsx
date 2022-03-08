import { Link } from "react-router-dom"
import '../../styles/components/home.scss'

export const Home: React.FunctionComponent = () => {
  
  return(
    <section className="home">
      <h1>Home</h1>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </section>
  )
}