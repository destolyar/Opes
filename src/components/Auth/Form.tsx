import { useState } from "react"
import '../../styles/components/form.scss'

export const Form: React.FunctionComponent = () => {
  let [email, setEmail] = useState<string>('')
  let [password, setPassword] = useState<string>('')

  return(
    <div className="form">
      <p className="form__email-title">Email</p>
      <input className="form__email-input" name="email" type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <p className="form__email-title">Password</p>
      <input className="form__password-input" name="password" type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )
}