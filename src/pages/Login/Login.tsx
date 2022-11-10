import { FC, FormEvent, useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

import styles from './Login.module.css'

const MIN_LENGTH = 0
const MAX_LENGTH = 8

type FormErrors = {
  usernameError: string;
  passwordError: string
}

const Login: FC = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [formErrors, setFormErrors] = useState<FormErrors>({
    usernameError: '',
    passwordError: ''
  })

  const { login, error } = useLogin()

  const validateUsername = () => {
    if (username.length === MIN_LENGTH) {
      setFormErrors((formErrors) => ({...formErrors, usernameError: "Username is required" }))
      return false;
    } else if (username.length < MAX_LENGTH) {
      setFormErrors((formErrors) => ({...formErrors, usernameError: "Username has to be at least 8 characters long" }))
      return false;
    }
  
    return true;
  }
  
  const validatePassword = () => {
    if (password.length === MIN_LENGTH) {
      setFormErrors((formErrors) => ({...formErrors, passwordError: "Password is required" }))
      return false;
    } else if (password.length < MAX_LENGTH) {
      setFormErrors((formErrors) => ({...formErrors, passwordError: "Password has to be at least 8 characters long" }))
      return false;
    }
  
    return true;
  }
  
  const validateForm = () => {
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
  
    return isUsernameValid && isPasswordValid
  }


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()    
      if(validateForm()) {
       login(username, password);
      }
  }

  return (

    <div className={styles.wrapper}>

      {error && 
        <div className={styles.error}>  
          <p>{error}</p>
        </div>
      }

      <div className={styles.title}>
        <h1>Welcome to ByWays</h1>
      </div>

      <form className={styles['login-form']} onSubmit={handleSubmit} >

        <label>
          <img className={styles['username-icon']} src={`./assets/Username.png`} alt="username-icon" /> 
          <input 
            type="text" 
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className={formErrors.usernameError ? styles.red : ''}
          />        
        </label>
        {formErrors.usernameError && <p className={styles.formError}>{formErrors.usernameError}</p>} 
        


        <label>
          <img className={styles['password-icon']} src={`./assets/Password.png`} alt="password-icon" />
          <input 
            type="password" 
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={formErrors.usernameError ? styles.red : ''}
          />
        </label>
        {formErrors.passwordError && <p className={styles.formError}>{formErrors.passwordError}</p>} 

     

        <div className={styles['btn-wrapper']}>
          <button className={styles.btn}>
            Login
          </button>
        </div>

      </form>

    </div>

    
  )
}

export default Login

