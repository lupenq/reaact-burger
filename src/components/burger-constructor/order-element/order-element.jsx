import PropTypes from 'prop-types'
import styles from './index.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function OrderElement ({ ingridient, type, isLocked, handleClose }) {
  return (
    <main className={`${styles.root} ${isLocked ? 'pl-5' : ''}`}>
      {!isLocked && <DragIcon />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={ingridient.name}
        price={ingridient.price}
        thumbnail={ingridient.image}
        handleClose={handleClose}
      />
    </main>
  )
}

OrderElement.propTypes = {
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
  }).isRequired,
  type: PropTypes.oneOf(['top', 'bottom']),
  isLocked: PropTypes.bool,
  handleClose: PropTypes.func
}

export default OrderElement
