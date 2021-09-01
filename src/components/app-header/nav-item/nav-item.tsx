import { FC, ReactElement } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './index.module.css'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'

interface NavItemProps {
  Icon: ({ type }: TIconProps) => ReactElement,
  title: string,
  className?: string,
  to: string
}

const NavItem: FC<NavItemProps> = ({ Icon, title, className, to }) => {
  const { pathname } = useLocation()
  return (
    <NavLink to={to} exact activeClassName={styles.activeClassName} className={`${styles.root} ${className}`}>
      <Icon type={pathname === to ? 'primary' : 'secondary'}/>
      <span className={styles.title}>{title}</span>
    </NavLink>
  )
}

export default NavItem
