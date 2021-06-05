import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import IngredientsTabs from './ingridients-tabs/ingridients-tabs'
import IngredientsList from './ingredients-list/ingredients-list'

function BurgerIngredients ({ data }) {
  return (
    <div className={styles.root}>
      <IngredientsTabs />
      <IngredientsList data={data}/>
    </div>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  }).isRequired)
}

export default BurgerIngredients
