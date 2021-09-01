import styles from './index.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { removeIngridient } from '../../../services/slices/burgerConstructor'
import { useRef, FC } from 'react'
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd'
import { IIngredient } from '../../../interfaces'
import { useAppDispatch } from '../../../services/store'

interface IOrderElement {
  ingridient: IIngredient
  type?: 'top' | 'bottom'
  isLocked?: boolean
  index?: number
  moveIngridient?: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const OrderElement: FC<IOrderElement> = ({ ingridient, type, isLocked, index, moveIngridient }) => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: 'orderElement',
    collect (monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover (item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current || !moveIngridient) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index as number
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset() as XYCoord
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
      {!isLocked && (<DragIcon type={'primary'} />)}
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

export default OrderElement
