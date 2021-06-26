import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { addIngridient } from '../../../../services/slices/burgerConstructor'
import { useDrag } from 'react-dnd'

function IngredientsItem ({ ingridient, onClick }) {
  const dispatch = useDispatch()

  const count = useSelector(({ burgerConstructor }) => {
    return ingridient.type === 'bun' && burgerConstructor.bun._id === ingridient._id
      ? 1
      : burgerConstructor.ingridients.filter(item => item._id === ingridient._id).length
  })

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ingridient',
    item: { ingridient },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        dispatch(addIngridient(item.ingridient))
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }))

  const style = {
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? 'grabbing' : 'grab'
  }

  return (
    <>
      <div ref={drag} data-testid={`box-${ingridient}`} className={styles.root} onClick={onClick} style={style}>
        {!!count && <div className={styles.counter}>{count}</div>}
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
