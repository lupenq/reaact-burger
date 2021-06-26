import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styles from './index.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { removeIngridient } from '../../../services/slices/burgerConstructor'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

function OrderElement ({ ingridient, type, isLocked, index, moveIngridient }) {
  const dispatch = useDispatch()

  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: 'orderElement',
    collect (monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover (item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveIngridient(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'orderElement',
    item: () => {
      return { ingridient, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const style = {
    opacity: isDragging ? 0.4 : 1,
    cursor: isDragging ? 'grabbing' : 'grab'
  }
  !isLocked && drag(drop(ref))

  return (
    <main
      ref={ref}
      style={isLocked ? {} : style}
      data-handler-id={handlerId}
      className={`${styles.root} ${isLocked ? 'pl-5' : ''}`}
    >
      {!isLocked && (<DragIcon />)}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={`${ingridient.name} ${type === 'top' ? '(верх)' : type === 'bottom' ? '(низ)' : ''}`}
        price={ingridient.price}
        thumbnail={ingridient.image}
        handleClose={() => dispatch(removeIngridient(index))}
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
