import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../../../modal/modal'
import IngredientDetails from '../../ingredient-details/ingredient-details'

function IngredientsItem ({ ingridient }) {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      {
        modalVisible &&
        <Modal handleClose={() => setModalVisible(false)} title={'Детали ингридиента'}>
          <IngredientDetails {...ingridient}/>
        </Modal>
      }
      <div className={styles.root} onClick={() => setModalVisible(true)}>
        <img src={ingridient.image} alt="" className={styles.image} />
        <div className={styles.currencyBlock}>
          <span className={styles.price}>{ingridient.price}</span>
          <CurrencyIcon />
        </div>
        <span className={styles.title}>{ingridient.name}</span>
      </div>
    </>
  )
}

IngredientsItem.propTypes = {
  ingridient: PropTypes.shape({
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
  }).isRequired
}

export default IngredientsItem
