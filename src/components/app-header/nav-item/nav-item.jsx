import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './index.module.css'

const NavItem = ({ Icon, title, className, to }) => {
  const { pathname } = useLocation()
  return (
    <NavLink to={to} exact activeClassName={styles.activeClassName} className={`${styles.root} ${className}`}>
      <Icon type={pathname === to ? 'primary' : 'secondary'}/>
      <span className={styles.title}>{title}</span>
    </NavLink>
  )
}

NavItem.propTypes = {
  Icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  to: PropTypes.string
}

export default NavItem
