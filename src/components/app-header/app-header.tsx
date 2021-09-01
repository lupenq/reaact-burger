import { FC } from 'react'
import styles from './index.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import NavItem from './nav-item/nav-item'

const AppHeader: FC = () => {
  return (
    <header className={styles.root}>
      <section className={styles.content}>
        <div className={styles.leftSide}>
          <NavItem to={'/'} title='Конструктор' Icon={BurgerIcon} />
          <NavItem to={'/feed'} title='Лента заказов' Icon={ListIcon} />
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavItem to={'/profile'} title='Личный кабинет' Icon={ProfileIcon} className={styles.rightSide} />
      </section>
    </header>
  )
}

export default AppHeader
