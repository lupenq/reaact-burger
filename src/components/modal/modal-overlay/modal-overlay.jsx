import React from 'react'
// import PropTypes from 'prop-types'
// import BurgerIngredients from '../burger-ingredients/burger-ingredients'
// import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './index.module.css'

function ModalOverlay ({ children, onClick }) {
  return (
    <div className={styles.root} onClick={onClick}>
      {children}
    </div>
  )
}

export default ModalOverlay
