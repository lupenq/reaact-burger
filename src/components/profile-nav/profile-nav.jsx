import { NavLink } from 'react-router-dom'
import styles from './index.module.css'

export const ProfileNav = () => {
  return (
      <div className={styles.nav}>
        <NavLink to={'/profile'} className={styles.navLink} activeClassName={styles.activeNavLink}>
          Профиль
        </NavLink>
        <NavLink to={'/profile/orders'} className={styles.navLink} activeClassName={styles.activeNavLink}>
          История заказов
        </NavLink>
        <NavLink to={'/logout'} className={styles.navLink} activeClassName={styles.activeNavLink}>
          Выход
        </NavLink>
        <span className={styles.desc}>
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
  )
}
