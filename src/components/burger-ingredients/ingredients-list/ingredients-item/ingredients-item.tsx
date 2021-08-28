import styles from './index.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { addIngridient } from '../../../../services/slices/burgerConstructor'
import { useDrag } from 'react-dnd'
import { IIngredient } from '../../../../interfaces'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../services/store'

interface IIngredientsItemProps {
  ingridient: IIngredient
  onClick: () => void
}

const IngredientsItem: FC<IIngredientsItemProps> = ({ ingridient, onClick }) => {
  const dispatch = useAppDispatch()

  const count = useAppSelector(({ burgerConstructor }) => {
    return ingridient.type === 'bun' && burgerConstructor.bun?._id === ingridient._id
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
    <div ref={drag} id={'drag'} className={styles.root} onClick={onClick} style={style}>
      {!!count && (<div className={styles.counter}>{count}</div>)}
      <img src={ingridient.image} alt="" className={styles.image} />
      <div className={styles.currencyBlock}>
        <span className={styles.price}>{ingridient.price}</span>
        <CurrencyIcon type={'primary'} />
      </div>
      <span className={styles.title}>{ingridient.name}</span>
    </div>
  )
}

export default IngredientsItem
