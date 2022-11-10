import { FC } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

// styles
import styles from './Nav.module.css'


const Nav: FC = () => {

    const { token } = useAuthContext()
    const { logout } = useLogout()


  return (
    <div>

        <div className={styles['top-nav']}>
            <div className={styles['dots-container']}>
                <div className={styles.dots}></div>
                <div className={styles.dots}></div>
                <div className={styles.dots}></div>
            </div>
        </div>

        <div className={styles['bottom-nav']}>

            <div className={styles['logo-container']}>
                <img src={`./assets/Logo.png`} alt="logo" />
            </div>

            {token && (
                <div className={styles['btn-container']}>
                    <button 
                        onClick={logout}
                        className={styles.btn}
                    >Logout</button>
                    <img className={styles['logout-icon']} src={`./assets/Logout.png`} alt="logout-icon" />
                </div> 
            )}

        </div>

    </div>
  )
}

export default Nav
