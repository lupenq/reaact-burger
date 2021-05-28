import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'

const NavItem = ({Icon, title, className}) => {
  return (
		<div className={`${styles.root} ${className}`}>
			<Icon />
			<span className={styles.title}>{title}</span>
		</div>
	)
}

NavItem.propTypes = {
	Icon: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	className: PropTypes.string
}

export default NavItem
