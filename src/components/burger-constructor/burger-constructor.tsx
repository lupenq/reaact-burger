import { useState, useMemo, useCallback, FC } from 'react'
import styles from './index.module.css'
import { useHistory } from 'react-router-dom'
import Modal from '../modal/modal'
import OrderDetails from './order-details/order-details'
import OrderElement from './order-element/order-element'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { postOrder } from '../../services/slices/order'
import { changeIndexes } from '../../services/slices/burgerConstructor'
import { useDrop } from 'react-dnd'
import { useAppSelector, useAppDispatch } from '../../services/store'

const BurgerConstructor: FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'ingridient',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  const isActive = canDrop && isOver

  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const { ingridients, bun } = useAppSelector(store => store.burgerConstructor)
  const dispatch = useAppDispatch()
  const { isLoginned } = useAppSelector(store => store.user)
  const history = useHistory()

  const totalPrice = useMemo(() => {
    if (ingridients.length || bun?.price) {
      return ingridients.reduce((acc: number, value: any) => acc + value.price, 0) + ((bun?.price || 0) * 2 || 0)
    }

    return 0
  }, [bun?.price, ingridients])

  const handleCheckoutButton = () => {
    if (!isLoginned) {
      return history.push('/login')
    }

    dispatch(postOrder())
    setModalVisible(true)
  }

  const moveIngridient = useCallback((dragIndex, hoverIndex) => {
    dispatch(changeIndexes({ dragIndex, hoverIndex }))
  }, [dispatch])

  return (
    <main className={styles.root} >
      <div className={styles.orderList} ref={drop} id={'drop'}>
        {canDrop && (<div className={styles.dropHover}>
          {!isActive && (<span className={styles.dropText}>Переместите ингредиент в эту область</span>)}
          {isActive && (<span className={styles.dropText}>Теперь можете отпустить его</span>)}
        </div>)}
        {bun?.name || ingridients.length
          ? (<div className={styles.ingridientsWrapper}>
        {bun?.name && <OrderElement
          ingridient={bun}
          type='top'
          isLocked={true}
        />}
        <div className={styles.scrollableList}>
          {
            !!ingridients.length &&
              ingridients.map((item, index) => {
                return (<OrderElement
                  key={item.addedAt}
                  index={index}
                  ingridient={item}
                  isLocked={false}
                  moveIngridient={moveIngridient}
                />)
              })
          }
        </div>
        {bun?.name && (<OrderElement
          ingridient={bun}
          type='bottom'
          isLocked={true}
        />)}
        </div>)
          : (!isActive && !canDrop) &&
          (<span className={styles.placeholderText}>Добавьте свой первый ингредиент или булку</span>)}
      </div>
      <div className={styles.orderInfo}>
        <span className={styles.totalPrice}>
          {totalPrice}
        </span>
        <CurrencyIcon type={'primary'} />
        <div className={`${styles.submitOrder} ${!bun?.name && styles.disabled}`} >
          <Button type="primary" size="medium" onClick={handleCheckoutButton}>Оформить заказ</Button>
        </div>
      </div>
      {
        modalVisible &&
        (<Modal handleClose={() => setModalVisible(false)}>
          <OrderDetails />
        </Modal>)
      }
    </main>
  )
}

export default BurgerConstructor
